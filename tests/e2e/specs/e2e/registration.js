/// <reference types="Cypress" />

describe('Registration', () => {
  it('Visits the registration route', () => {
    cy.visit('localhost:8080/register');
    cy.contains('h1', 'Register');
    cy.get('input[name=fullname]').type('Full Name');
    cy.get('input[name=login]').type('email@mail');
    cy.get('input[name=password]').click();
    cy.get('input[name=login').siblings().should('have.class', 'error--text');
  });
});
