const email = 'tobias@blueshoe.de';

describe('Forgot Password', () => {
  it('Visits forgot password route, enters data, tests modal', () => {
    cy.visit('localhost:8080/forgot-password');
    cy.get('#input-18').type(email);
    cy.get('button').click();
    cy.get('.modal-card__headline')
      .should('be.visible')
      .should('contain', email);
  });
});
