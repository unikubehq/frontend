import { GraphQLError } from 'graphql';
import project from '../../fixtures/projects/cypressProject.json';

describe('ProjectDetail', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
    cy.login(true, false, true);
    cy.visit('/overview');
    cy.wait('@ProjectsQuery');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ProjectDetailQuery') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'ProjectDetailQuery';
        req.reply({
          data: project,
        });
      }
    });
    cy.get('.project-card__wrapper .project-card__edit').first().click();
    cy.location('pathname').should('contain', '/project/');
    cy.wait('@ProjectDetailQuery');
  });

  it('Submits access token only when changed', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'UpdateProject') {
        expect(req.body.variables).to.not.have.any.key('accessToken');
      }
    });
    cy.get('.projectForm__submit').click();
  });

  it('Submits project id when in edit mode', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'UpdateProject') {
        expect(req.body.variables).to.have.any.key('id');
      }
    });
    cy.get('.projectForm__submit').click();
  });

  it('Continues to overview when project was edited.', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'UpdateProject') {
        req.reply({
          data: {
            createUpdateProject: project,
          },
        });
      }
    });
    cy.get('.projectForm__submit').click();
    cy.location('pathname').should('contain', '/overview');
  });

  it('Prefills form when in edit mode', () => {
    cy.get('[name=projectName]').should('have.value', project.project.title);
    cy.get('[name=specRepo]').should('have.value', project.project.specRepository);
  });
  it('Disables submit button when form is invalid', () => {
    cy.get('.projectForm__submit').should('not.be.disabled');
    cy.get('[name=projectName]').clear();
    cy.get('.projectForm__submit').should('be.disabled');
  });

  it('Displays input field errors', () => {
    cy.get('[name=projectName]').clear().blur().parents('.v-input__control')
      .find('.v-messages__message')
      .should('contain.text', 'This field is required.');
  });

  it('Displays submission error when something went wrong', () => {
    const errorMessage = 'Something went wrong';
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'UpdateProject') {
        req.reply(200, { errors: [new GraphQLError(errorMessage)] });
      }
    });
    cy.get('.projectForm__submit').click();
    cy.get('.v-alert__content').should('contain.text', errorMessage);
  });
});
