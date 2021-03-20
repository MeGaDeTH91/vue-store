describe('Categories page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.wait(1000);

    cy.get('input[name=email]').type('marto1@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.visit('http://localhost:8080/categories/all');
    cy.wait(500);
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should show categories page title!', () => {
    cy.get('h1').contains('Categories');
  });

  it('Should list all categories successfully!', () => {
    cy.get('div').contains('Musical instruments');
    cy.get('div').contains('Electronics');
    cy.get('div').contains('Home Accessories');
    cy.get('div').contains('Sports equipment');
    cy.get('div').contains('Vehicles');
  });

  it('Should list all category products successfully!', () => {
    cy.get('div')
      .contains('Musical instruments')
      .click();

    cy.get('h1').contains('Products by category "Musical instruments"');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');

    cy.contains('Dummy product for testing 1').should('not.exist');
    cy.contains('Dummy product for testing 2').should('not.exist');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
