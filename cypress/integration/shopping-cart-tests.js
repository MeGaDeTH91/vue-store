describe('Shopping cart page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.wait(1000);

    cy.get('input[name=email]').type('marto1@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);

    cy.wait(5500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });

    cy.visit('http://localhost:8080/shopping-cart');
    cy.wait(500);
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should show shopping cart page title!', () => {
    cy.get('h1').contains('Your shopping cart');
  });

  it('Should show no products in cart successfully!', () => {
    cy.get('h3').contains('Total price: 0 lv.');
  });

  it('Cart should work as expected!', () => {
    cy.get('h3').contains('Total price: 0 lv.');
    cy.get('a')
      .contains('Products')
      .click();
    cy.wait(400);

    cy.get('div').contains('Jackson SL2');
    cy.get('div')
      .contains('Ibanez RG550')
      .click();
    cy.wait(400);

    cy.contains('Add to cart').click();
    cy.wait(4500);
    cy.get('a')
      .contains('ShoppingCart')
      .click();
    cy.wait(2000);

    cy.url().should('eq', 'http://localhost:8080/shopping-cart');

    cy.get('div').contains('Ibanez RG550');
    cy.contains('Jackson SL2').should('not.exist');
    cy.contains('Dummy product for testing 1').should('not.exist');
    cy.contains('Dummy product for testing 2').should('not.exist');

    cy.wait(1000);

    cy.get('button')
      .contains('Remove')
      .click();

    cy.wait(500);

    cy.get('div').contains('Product removed from cart successfully!');
    cy.wait(3500);

    cy.contains('Total price: 0 lv.').should('exist');
  });

  it('Cart finish order as expected!', () => {
    cy.get('h3').contains('Total price: 0 lv.');
    cy.get('a')
      .contains('Products')
      .click();

    cy.get('div').contains('Jackson SL2');
    cy.get('div')
      .contains('Ibanez RG550')
      .click();
    cy.wait(500);

    cy.contains('Add to cart').click();
    cy.wait(3500);
    cy.get('div')
      .contains('Jackson SL2')
      .click();
    cy.wait(500);
    cy.contains('Add to cart').click();
    cy.wait(3500);

    cy.get('a')
      .contains('ShoppingCart')
      .click();
    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:8080/shopping-cart');

    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
    cy.contains('Dummy product for testing 1').should('not.exist');
    cy.contains('Dummy product for testing 2').should('not.exist');

    cy.get('button')
      .contains('Place Order')
      .click();
    cy.wait(200);
    cy.get('div').contains('Order placed successfully!');
    cy.wait(3500);

    cy.get('a')
      .contains('ShoppingCart')
      .click();
    cy.wait(2000);

    cy.contains('Total price: 0 lv.').should('exist');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });
});
