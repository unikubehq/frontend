import project from '../../fixtures/projects/kustomizeProject.json';

describe('Helm Overrides', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.wait('@Overview');
    cy.wait('@ProjectsQuery');
    cy.wait(3000);
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ProjectDetailQuery') {
        req.reply({
          data: project,
        });
      }
    });
    cy.get('.project-card__wrapper .project-card__detail').first().click();
    cy.location('pathname', { timeout: 3000 })
      .should('include', '/project');
    cy.get('.projectDeck .projectDeck-edit').first().click();
  });

  it('it does not show helm overrides button when schema is available', () => {
    cy.get('.helmOverridesButton').should('have.length', 0);
  });
});
