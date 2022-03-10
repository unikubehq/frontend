import project from '../../fixtures/projects/cypressProject.json';
import allProjects from '../../fixtures/projects/allProjectsQuery.json';
import rptMember from '../../fixtures/organizations/rpt_member.json';

describe('ProjectDetail', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
  });

  it('Displays 404 message when project is not part of current organization', () => {
    // project query interceptor
    cy.intercept('POST', '/graphql', (req) => {
      // This is needed in order to prevent error handler overlay.
      if (req.body.operationName === 'ProjectsQuery') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'ProjectsQuery';
        req.reply({
          data: allProjects,
        });
      }
      if (req.body.operationName === 'OrganizationMembersQuery') {
        Cypress.log({ name: 'GraphQL', message: req.body.operationName });
        // eslint-disable-next-line no-param-reassign
        req.alias = 'OrganizationMembersQuery';
        req.reply({
          data: rptMember,
        });
      }
      if (req.body.operationName === 'ProjectDetailQuery') {
        req.reply({
          data: project,
        });
      }
    });
    cy.login(true, false, true);
    cy.visit('/overview');
    cy.get('.project-card__wrapper a .project-card__detail').first().parent().click();
    cy.location('href').should('include', '/project/');
    cy.location().then((loc) => {
      cy.get('.project-detail__title').should('contain', project.project.title);
      cy.get('.organization-dropdown--item').click();
      cy.get('.organization-dropdown > .v-list > :nth-child(2)').click();
      cy.location('pathname').should('eq', '/overview');
      cy.visit(loc.pathname);
      cy.get('.project-detail h3').should('contain', 'not found');
    });
    // paste project url
    // should return 404
  });
});
