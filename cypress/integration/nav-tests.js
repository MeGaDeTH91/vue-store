describe('Navbar buttons', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.wait(1000);
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should show home button link correctly!', () => {
    cy.get('a').contains('Vue-Store');
  });

  it('Should show guest links correctly!', () => {
    cy.get('a').contains('Products');
    cy.get('a').contains('Categories');
    cy.get('a').contains('Register');
    cy.get('a').contains('Login');
    cy.contains('Profile').should('not.exist');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  it('Should show user buttons', function() {
    cy.visit('http://localhost:8080/login');

    cy.get('input[name=email]').type('marto1@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.get('a').contains('Products');
    cy.get('a').contains('Categories');
    cy.get('a').contains('Profile');
    cy.get('a').contains('ShoppingCart');
    cy.get('a').contains('Logout');
    cy.contains('Users').should('not.exist');
    cy.contains('Add Product').should('not.exist');
    cy.contains('Add Category').should('not.exist');
    cy.get('h1').contains('Products');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  it('Should show admin buttons', function() {
    cy.visit('http://localhost:8080/login');

    cy.get('input[name=email]').type('marto@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.get('a').contains('Products');
    cy.get('a').contains('Categories');
    cy.get('a').contains('User');
    cy.get('a').contains('Add Product');
    cy.get('a').contains('Add Category');
    cy.get('a').contains('Profile');
    cy.get('a').contains('ShoppingCart');
    cy.get('a').contains('Logout');
    cy.get('h1').contains('Products');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
