import project from '../../fixtures/projects/cypressProject.json';

describe('ProjectDetail', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
    cy.login(true, false, true);
    cy.visit('/overview');
    cy.get('.projects__createButton').first().click();
    cy.get('[name=projectName]').type('Some project name');
    cy.get('[name=specRepo]').type('https://github.com/unikubehq/frontend');
  });

  it('Does not submit project id when in creation mode', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateProject') {
        expect(req.body.variables).to.not.have.any.key('id');
      }
    });
    cy.get('.projectForm__submit').click();
  });

  it('Refreshes token after project creation', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateProject') {
        req.reply({
          data: project,
        });
      }
    });
    cy.get('.projectForm__submit').click();
    cy.get('@updateToken').should('have.been.called');
  });

  it('Continues to add member form when creation was successful.', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateProject') {
        req.reply({
          data: {
            createUpdateProject: project,
          },
        });
      }
    });
    cy.get('.projectForm__submit').click();
    cy.get('@updateToken').should('have.been.called');
    cy.location('pathname').should('contain', '/add-members');
  });
});
