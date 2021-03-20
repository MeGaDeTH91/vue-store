describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.wait(1000);
  });

  it('Should show products page title!', () => {
    cy.get('h1').contains('Products');
  });

  it('Should show nav correctly!', () => {
    cy.get('nav') // yields <nav>
      .should('be.visible');
  });

  it('Should show products correctly!', () => {
    cy.get('h1').contains('Products');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  it('Should set auth cookie when logging in!', () => {
    cy.visit('http://localhost:8080/logout');
    cy.wait(4500);

    cy.visit('http://localhost:8080/login');

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

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
