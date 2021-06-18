describe('Logs into the app', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
  });

  it('logs in and visits overview', () => {
    cy.fixture('projects/allProjectsQuery.json').then((allProjects) => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'ProjectsQuery') {
          req.reply({
            data: allProjects,
          });
        }
      });
    });
    cy.visit('/overview');
    cy.get('.project-card__wrapper').should('have.length', 2);
  });
});
