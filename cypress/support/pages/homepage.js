/// <reference types="cypress" />

export const homepage = {
    openMenu(menu){
        return cy.get(`[href="/Tab/${menu}"]`).click()
    }
}