/// <reference types="cypress" />

export class profilepage {
    customerName() {
        return cy.get('[data-testid="CustomerName"]');
    }
}