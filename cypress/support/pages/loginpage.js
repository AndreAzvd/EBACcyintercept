/// <reference types="cypress" />

export class loginpage {
    get #email() { return cy.get('[data-testid="email"]') }
    get #password() { return cy.get('[data-testid="password"]') }
    get #btnLogin() { return cy.get('[data-testid="btnLogin"]') }

    login(email, password) {
        this.#email.clear().type(email)
        this.#password.clear().type(password)
        this.#btnLogin.click()
    }
}

module.exports = { loginpage: new loginpage() }