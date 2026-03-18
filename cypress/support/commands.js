const { homepage } = require("../support/pages/homepage")
const { loginpage } = require("../support/pages/loginpage")
const { email, senha } = require("../fixtures/data.json")
const { ProfilePage } = require("../support/pages/profilepage")

Cypress.Commands.add('login', (email, password) => {
    cy.get('.icon-user-unfollow').click()
    cy.get('[name="username"]').clear().type(email)
    cy.get('.woocommerce-form > :nth-child(2) > [name="password"]').clear().type(password)
    cy.get('[name="login"]').click()
});

Cypress.Commands.add('addCart', () => {

    cy.get('.button-variable-item-XL').click()
    cy.get('.button-variable-item-Orange').click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message > .button').click()
})

Cypress.Commands.add('checkout', () => {
    cy.scrollTo('bottom')
    cy.get('.checkout-button').click()
    cy.scrollTo(0, 500)
    cy.get('#billing_first_name').type('Teste')
    cy.get('#billing_last_name').type('Teste')
    cy.get('#billing_address_1').type('Teste')
    cy.get('#billing_email').type('cliente@ebac.art.br')
    cy.get('#billing_phone').type('11999999999')
    cy.get('#billing_city').type('Teste')
    cy.get('#billing_postcode').type('00000000')
    cy.get('.wc_payment_method.payment_method_cod > [name="payment_method"]').click()
    cy.get('[name="terms"]').click()
    cy.get('#place_order').click()
})