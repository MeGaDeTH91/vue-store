describe('Admin user managemenet pages', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.wait(1000);

    cy.get('input[name=email]').type('marto@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.visit('http://localhost:8080/users');
    cy.wait(500);
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should show users management page title!', () => {
    cy.get('h1').contains('Manage users');
  });

  it('Should list all users successfully!', () => {
    cy.wait(2500);
    cy.get('tr').contains('marto@abv.bg');
    cy.get('tr').contains('marto1@abv.bg');
    cy.get('tr').contains('marto2@abv.bg');
  });

  it('Should change user status successfully!', () => {
    cy.get('td')
      .contains('marto2@abv.bg')
      .parent()
      .find('input[type="checkbox"]')
      .first()
      .should('be.disabled')
      .should('have.attr', 'checked');
    cy.get('td')
      .contains('marto2@abv.bg')
      .parent()
      .contains('Ban')
      .click();
    cy.wait(300);
    cy.get('div').contains('User status changed successfully!');

    cy.wait(4000);

    cy.get('td')
      .contains('marto2@abv.bg')
      .parent()
      .find('input[type="checkbox"]')
      .first()
      .should('be.disabled')
      .should('not.have.attr', 'checked');
    cy.get('td')
      .contains('marto2@abv.bg')
      .parent()
      .contains('Unban')
      .click();
    cy.wait(300);
    cy.get('div').contains('User status changed successfully!');
    cy.wait(4000);

    cy.get('td')
      .contains('marto2@abv.bg')
      .parent()
      .find('input[type="checkbox"]')
      .first()
      .should('be.disabled')
      .should('have.attr', 'checked');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
