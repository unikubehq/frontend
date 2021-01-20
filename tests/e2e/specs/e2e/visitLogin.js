describe('Visit Login from Registration', () => {
  it('Clicks the login link in the registration route', () => {
    cy.visit('localhost:8080/register');
    cy.contains('Sign in').click();
    cy.contains('h1', 'Login');
    cy.url().should('include', '/login');
  });
});
