describe('Dropdown', () => {
  it('Tests dropdowns on dashboard', () => {
    cy.viewport(1920, 1080);
    cy.visit('localhost:8080');
    cy.get('div').contains('The Orange Co').click();
    cy.get('.v-list-item__title').contains('Create New Organization')
      .should('be.visible');
  });
});
