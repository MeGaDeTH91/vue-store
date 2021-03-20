describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.wait(1000);
  });

  it('Should show login page title!', () => {
    cy.get('h1').contains('Login');
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should set auth cookie when logging in!', function() {
    cy.get('input[name=email]').type('marto@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.get('h1').contains('Products');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  it('Should throw error on attempt with wrong email!', function() {
    cy.get('input[name=email]').type('wrong@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(1000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('div').contains('Invalid credentials!');
    cy.url().should('eq', 'http://localhost:8080/login');
  });

  it('Should throw error on attempt with wrong password!', function() {
    cy.get('input[name=email]').type('marto@abv.bg');

    cy.get('input[name=password]').type(`wrongPass{enter}`);

    cy.wait(1000);

    cy.getCookies().should('have.length', 0);

    cy.get('div').contains('Invalid credentials!');
    cy.url().should('eq', 'http://localhost:8080/login');
  });

  it('Should logout successfully!', function() {
    cy.get('input[name=email]').type('marto@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(4000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.get('a')
      .contains('Logout')
      .click();

    cy.wait(4000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('a').contains('Products');
    cy.get('a').contains('Categories');
    cy.get('a').contains('Register');
    cy.get('a').contains('Login');
    cy.contains('Profile').should('not.exist');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
