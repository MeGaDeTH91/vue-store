describe('Profile page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.wait(1000);

    cy.get('input[name=email]').type('marto1@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.visit('http://localhost:8080/profile-details');
    cy.wait(500);
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should show all user information correctly!', () => {
    cy.get('h1').contains('Martin Taskov2');
    cy.get('h3').contains('marto1@abv.bg');
    cy.get('h3').contains('0012345');
  });

  it('Should show buttons correctly!', () => {
    cy.get('button').contains('Edit Profile');
    cy.get('button').contains('My Orders');
  });

  it('Should update user information correctly!', () => {
    cy.get('button')
      .contains('Edit Profile')
      .click();
    cy.wait(300);

    const name = 'Martin Taskov2';
    const phone = '0012345';

    const tempName = 'Martin Taskov155';
    const tempPhone = 'no phone';

    cy.get('input[name=fullName]').should('have.value', name);
    cy.get('input[name=phone]').should('have.value', phone);

    cy.get('input[name=fullName]')
      .clear()
      .type(tempName);
    cy.get('input[name=phone]')
      .clear()
      .type(tempPhone);
    cy.get('button')
      .contains('Update info')
      .click();
    cy.wait(100);

    cy.get('div').contains('User info updated successfully!');
    cy.wait(3500);

    cy.get('h1').contains(tempName);
    cy.get('h3').contains(tempPhone);
    cy.get('button')
      .contains('Edit Profile')
      .click();

    cy.wait(500);

    cy.get('input[name=fullName]')
      .clear()
      .type(name);
    cy.get('input[name=phone]')
      .clear()
      .type(phone);
    cy.get('button')
      .contains('Update info')
      .click();
    cy.wait(3500);
  });

  it('Should throw error on update user information with invalid full name!', () => {
    cy.get('button')
      .contains('Edit Profile')
      .click();
    cy.wait(300);

    const name = 'Martin Taskov2';
    const phone = '0012345';

    const tempName = 'Y';
    const tempPhone = 'no phone';

    cy.get('input[name=fullName]').should('have.value', name);
    cy.get('input[name=phone]').should('have.value', phone);

    cy.get('input[name=fullName]')
      .clear()
      .type(tempName);
    cy.get('input[name=phone]')
      .clear()
      .type(tempPhone);
    cy.get('button')
      .contains('Update info')
      .click();

    cy.wait(100);

    cy.get('span').contains('Please fill all fields correctly.');
    cy.wait(2500);

    cy.url().should('eq', 'http://localhost:8080/profile-edit');
  });

  it('Should show user orders correctly!', () => {
    cy.get('button')
      .contains('My Orders')
      .click();

    cy.get('h1').contains('Order history');
    cy.get('div').contains('60562808108adc2cec1b57ba');
    cy.get('div').contains('6056293a108adc2cec1b57bb');
    cy.get('div').contains('60563124108adc2cec1b57bc');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
