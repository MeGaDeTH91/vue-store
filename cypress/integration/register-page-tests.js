describe('Register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/register');
    cy.wait(1000);
  });

  it('Should show register page title!', () => {
    cy.get('h1').contains('Register');
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should register user and set auth cookie when logging in!', function() {
    const currentName = userID_generate();
    cy.get('input[name=email]').type(currentName);
    cy.get('input[name=fullName]').type('Test User');
    cy.get('input[name=phone]').type('0889');

    cy.get('input[name=password]').type(`123`);
    cy.get('input[name=re-password]').type(`123{enter}`);

    cy.wait(5500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.get('h1').contains('Products');
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');

    cy.visit('http://localhost:8080/profile-details');
    cy.wait(1500);
    cy.get('h1').contains('Test User');
    cy.get('h3').contains(currentName);
  });

  it('Should throw error on attempt with invalid email!', function() {
    cy.get('input[name=email]').type('invalidEmail@ab.vbg.3');
    cy.get('input[name=fullName]').type('Test User');
    cy.get('input[name=phone]').type('0889');

    cy.get('input[name=password]').type(`123`);
    cy.get('input[name=re-password]').type(`123{enter}`);

    cy.wait(1000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('div').contains(
      'Please fill all fields correctly.'
    );
    cy.url().should('eq', 'http://localhost:8080/register');
  });

  it('Should throw error on attempt with invalid full name!', function() {
    cy.get('input[name=email]').type(userID_generate());
    cy.get('input[name=fullName]').type('Y');
    cy.get('input[name=phone]').type('0889');

    cy.get('input[name=password]').type(`123`);
    cy.get('input[name=re-password]').type(`123{enter}`);

    cy.wait(1000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('div').contains(
      'Please fill all fields correctly.'
    );
    cy.url().should('eq', 'http://localhost:8080/register');
  });

  it('Should throw error on attempt with invalid password!', function() {
    cy.get('input[name=email]').type(userID_generate());
    cy.get('input[name=fullName]').type('Test User');
    cy.get('input[name=phone]').type('0889');

    cy.get('input[name=password]').type(`1`);
    cy.get('input[name=re-password]').type(`1{enter}`);

    cy.wait(1000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('div').contains(
      'Please fill all fields correctly.'
    );
    cy.url().should('eq', 'http://localhost:8080/register');
  });

  it('Should throw error on attempt with different re-password!', function() {
    cy.get('input[name=email]').type(userID_generate());
    cy.get('input[name=fullName]').type('Test User');
    cy.get('input[name=phone]').type('0889');

    cy.get('input[name=password]').type(`123`);
    cy.get('input[name=re-password]').type(`12345{enter}`);

    cy.wait(300);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('div').contains('Passwords do not match.');
    cy.url().should('eq', 'http://localhost:8080/register');
  });

  it('Should throw error on attempt with empty re-password!', function() {
    cy.get('input[name=email]').type(userID_generate());
    cy.get('input[name=fullName]').type('Test User');
    cy.get('input[name=phone]').type('0889');

    cy.get('input[name=password]').type(`123`);
    cy.get('input[name=re-password]').type(`{enter}`);

    cy.wait(1000);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).not.to.exist;
    });

    cy.get('div').contains(
      'Please fill all fields correctly.'
    );
    cy.url().should('eq', 'http://localhost:8080/register');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });

  function userID_generate() {
    var text = 'test-';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    text += '@abv.bg';
    return text;
  }
});
