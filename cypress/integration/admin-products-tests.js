describe('Admin Products management pages', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.wait(1000);

    cy.get('input[name=email]').type('marto@abv.bg');

    cy.get('input[name=password]').type(`123{enter}`);
    cy.get('button')
      .contains('Login')
      .click();

    cy.wait(6500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('access-token')).to.exist;
    });
  });

  it('Should show nav correctly!', () => {
    cy.get('nav').should('be.visible');
  });

  it('Should show products page title!', () => {
    cy.get('h1').contains('Products');
  });

  it('Should list all products successfully!', () => {
    cy.get('div').contains('Ibanez RG550');
    cy.get('div').contains('Jackson SL2');
  });

  // This test covers deletion also
  it('Should create product successfully!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type(
      'One of the best dummy products on the market.'
    );
    cy.wait(300);

    cy.get('input[name=imageURL').type(
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg'
    );
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('1800.99');
    cy.get('input[name=quantity]')
      .clear()
      .type(`21`);

    cy.get('[data-cy=select-input]').type('Musical instruments{enter}');
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();
    cy.wait(10000);

    cy.get('div').contains(currentProduct);
    cy.get('div')
      .contains(currentProduct)
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Delete')
      .click();
    cy.wait(500);

    cy.get('button')
      .contains('Delete')
      .click();
    cy.wait(6500);

    cy.contains(currentProduct).should('not.exist');
  });

  it('Should throw error on add product with invalid title!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    cy.get('input[name=title]').type('T');
    cy.get('textarea[name=description]').type(
      'One of the best dummy products on the market.'
    );
    cy.wait(300);

    cy.get('input[name=imageURL').type(
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg'
    );
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('1800.99');
    cy.get('input[name=quantity]')
      .clear()
      .type(`21`);

    cy.get('[data-cy=select-input]').type('Musical instruments{enter}');
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();

    cy.wait(300);
    cy.get('div').contains(
      'Please provide product title, description, provide image and choose category.'
    );
    cy.wait(6500);

    cy.url().should('eq', 'http://localhost:8080/products/create');
  });

  it('Should throw error on add product with invalid description!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type('G');
    cy.wait(300);

    cy.get('input[name=imageURL').type(
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg'
    );
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('1800.99');
    cy.get('input[name=quantity]')
      .clear()
      .type(`21`);

    cy.get('[data-cy=select-input]').type('Musical instruments{enter}');
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();

    cy.wait(300);
    cy.get('div').contains(
      'Please provide product title, description, provide image and choose category.'
    );

    cy.wait(6500);

    cy.url().should('eq', 'http://localhost:8080/products/create');
  });

  it('Should throw error on add product with invalid imageURL!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type(
      'One of the best dummy products on the market.'
    );
    cy.wait(300);

    cy.get('input[name=imageURL').type('Invalid ImageURL');
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('1800.99');
    cy.get('input[name=quantity]')
      .clear()
      .type(`21`);

    cy.get('[data-cy=select-input]').type('Musical instruments{enter}');
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();

    cy.wait(300);
    cy.get('div').contains('Invalid image URL.');
    cy.wait(6500);

    cy.url().should('eq', 'http://localhost:8080/products/create');
  });

  it('Should throw error on add product with invalid price!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type(
      'One of the best dummy products on the market.'
    );
    cy.wait(300);

    cy.get('input[name=imageURL').type(
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg'
    );
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('-1');
    cy.get('input[name=quantity]')
      .clear()
      .type(`21`);

    cy.get('[data-cy=select-input]').type('Musical instruments{enter}');
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();

    cy.wait(300);
    cy.get('div').contains(
      'Please provide product title, description, provide image and choose category.'
    );
    cy.wait(6500);

    cy.url().should('eq', 'http://localhost:8080/products/create');
  });

  it('Should throw error on add product with invalid quantity!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type(
      'One of the best dummy products on the market.'
    );
    cy.wait(300);

    cy.get('input[name=imageURL').type(
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg'
    );
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('1000');
    cy.get('input[name=quantity]')
      .clear()
      .type(`-1`);

    cy.get('[data-cy=select-input]').type('Musical instruments{enter}');
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();

    cy.wait(300);
    cy.get('div').contains(
      'Please provide product title, description, provide image and choose category.'
    );
    cy.wait(6500);

    cy.url().should('eq', 'http://localhost:8080/products/create');
  });

  it('Should throw error on add product with invalid category!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type(
      'One of the best dummy products on the market.'
    );
    cy.wait(300);

    cy.get('input[name=imageURL').type(
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg'
    );
    cy.wait(500);

    cy.get('input[name=price]')
      .clear()
      .type('1000');
    cy.get('input[name=quantity]')
      .clear()
      .type(`-1`);

    cy.get('button')
      .contains('Create')
      .click();
    cy.wait(6500);

    cy.url().should('eq', 'http://localhost:8080/products/create');
  });

  it('Should edit product successfully!', () => {
    cy.get('a')
      .contains('Add Product')
      .click();
    cy.wait(6500);
    cy.url().should('eq', 'http://localhost:8080/products/create');

    const currentProduct = productID_generate();
    const currentDescription = 'One of the best dummy products on the market.';
    const currentImageURL =
      'https://res.cloudinary.com/devpor11z/image/upload/v1597256074/uejiasmb7qr8ghi1lenu.jpg';
    const currentPrice = '1800.99';
    const currentQuantity = '21';
    const currentCategory = 'Musical instruments';

    cy.get('input[name=title]').type(currentProduct);
    cy.get('textarea[name=description]').type(currentDescription);
    cy.wait(300);
    cy.get('input[name=imageURL').type(currentImageURL);
    cy.wait(500);
    cy.get('input[name=price]')
      .clear()
      .type(currentPrice);
    cy.get('input[name=quantity]')
      .clear()
      .type(currentQuantity);
    cy.get('[data-cy=select-input]').type(`${currentCategory}{enter}`);
    cy.wait(200);

    cy.get('button')
      .contains('Create')
      .click();
    cy.wait(12000);

    cy.get('div')
      .contains(currentProduct)
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Edit')
      .click();
    cy.wait(500);

    cy.get('input[name=title]').should('have.value', currentProduct);
    cy.get('textarea[name=description]').should(
      'have.value',
      currentDescription
    );
    cy.wait(300);
    cy.get('input[name=imageURL').should('have.value', currentImageURL);
    cy.wait(500);
    cy.get('input[name=price]').should('have.value', currentPrice);
    cy.get('input[name=quantity]').should('have.value', currentQuantity);

    const tempProduct = 'Some test title';
    const tempDescription =
      'TEMP description - One of the best dummy products on the market.';
    const tempImageURL =
      'https://res.cloudinary.com/devpor11z/image/upload/v1597093960/mar68f80majbxzebc9fr.png';
    const tempPrice = '50000';
    const tempQuantity = '10000';

    cy.get('input[name=title]')
      .clear()
      .type(tempProduct);
    cy.get('textarea[name=description]')
      .clear()
      .type(tempDescription);
    cy.wait(300);
    cy.get('input[name=imageURL')
      .clear()
      .type(tempImageURL);
    cy.wait(500);
    cy.get('input[name=price]')
      .clear()
      .type(tempPrice);
    cy.get('input[name=quantity]')
      .clear()
      .type(tempQuantity);

    cy.get('button')
      .contains('Edit')
      .click();
    cy.wait(12000);

    cy.get('div')
      .contains(tempProduct)
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Edit')
      .click();
    cy.wait(500);

    cy.get('input[name=title]').should('have.value', tempProduct);
    cy.get('textarea[name=description]').should('have.value', tempDescription);
    cy.wait(300);
    cy.get('input[name=imageURL').should('have.value', tempImageURL);
    cy.wait(500);
    cy.get('input[name=price]').should('have.value', tempPrice);
    cy.get('input[name=quantity]').should('have.value', tempQuantity);

    cy.get('input[name=title]')
      .clear()
      .type(currentProduct);
    cy.get('textarea[name=description]')
      .clear()
      .type(currentDescription);
    cy.wait(300);
    cy.get('input[name=imageURL')
      .clear()
      .type(currentImageURL);
    cy.wait(500);
    cy.get('input[name=price]')
      .clear()
      .type(currentPrice);
    cy.get('input[name=quantity]')
      .clear()
      .type(currentQuantity);
    cy.get('button')
      .contains('Edit')
      .click();
    cy.wait(12000);

    cy.get('div').contains(currentProduct);
    cy.get('div')
      .contains(currentProduct)
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('Delete')
      .click();
    cy.wait(500);

    cy.get('button')
      .contains('Delete')
      .click();
    cy.wait(5500);

    cy.contains(currentProduct).should('not.exist');
  });

  it('Should show footer correctly!', () => {
    cy.get('footer').should('be.visible');
    cy.get('p').contains('Copyright © 2021 - All Rights Reserved');
  });

  function productID_generate() {
    var text = 'test-';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    text += '_product';
    return text;
  }
});
