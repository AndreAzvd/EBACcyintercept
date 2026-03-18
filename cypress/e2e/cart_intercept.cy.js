/// <reference types="cypress" />

describe('Carrinho via intercept', () => {
  beforeEach(() => {
    cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' })
    cy.visit('/')
  })

  it('Adicionar produto no carrinho utilizando intercept', () => {
    cy.intercept('POST', '**/?wc-ajax=add_to_cart*', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          product_id: 20,
          cart_item_key: 'fake-key-123',
          quantity: 1,
          message: 'Produto adicionado ao carrinho'
        }
      }
    }).as('addToCart')

    cy.window().then((win) => {
      return win.fetch('/?wc-ajax=add_to_cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'product_id=20&quantity=1'
      })
    })

    cy.wait('@addToCart').its('response.body').should('deep.equal', {
      success: true,
      data: {
        product_id: 20,
        cart_item_key: 'fake-key-123',
        quantity: 1,
        message: 'Produto adicionado ao carrinho'
      }
    })
  })

  it('Atualizar quantidade do carrinho - interceptando API', () => {
    cy.intercept('POST', '**/?wc-ajax=update_cart*', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          cart_item_key: 'fake-key-123',
          quantity: 2,
          message: 'Carrinho atualizado'
        }
      }
    }).as('updateCart')

    cy.window().then((win) => {
      return win.fetch('/?wc-ajax=update_cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'cart[%7Bfake-key-123%7D][qty]=2'
      })
    })

    cy.wait('@updateCart').its('response.body').should((body) => {
      expect(body.success).to.be.true
      expect(body.data).to.deep.equal({
        cart_item_key: 'fake-key-123',
        quantity: 2,
        message: 'Carrinho atualizado'
      })
    })
  })

  it('Remover item do carrinho - interceptando API', () => {
    cy.intercept('POST', '**/?wc-ajax=remove_cart_item*', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          cart_item_key: 'fake-key-123',
          cart_count: 0,
          message: 'Item removido do carrinho'
        }
      }
    }).as('removeCart')

    cy.window().then((win) => {
      return win.fetch('/?wc-ajax=remove_cart_item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'cart_item_key=fake-key-123'
      })
    })

    cy.wait('@removeCart').its('response.body').should('deep.equal', {
      success: true,
      data: {
        cart_item_key: 'fake-key-123',
        cart_count: 0,
        message: 'Item removido do carrinho'
      }
    })
  })
})
