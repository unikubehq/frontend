import { createPinia, setActivePinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import organization from '../fixtures/organizations/organization.json';
import organizationBlueshoe from '../fixtures/organizations/organization_blueshoe.json';
import allProjects from '../fixtures/projects/allProjectsQuery.json';
import rptMember from '../fixtures/organizations/rpt_member.json';
import useAuthStore from '../../../src/stores/auth.ts';
import useContextStore from '../../../src/stores/context.ts';

Cypress.Commands.add('setupInterceptors', () => {
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
  });
});

Cypress.Commands.add('login', (multipleOrganizations, noOrganization, emptyStore, organizationContext) => {
  // Setup store
  const pinia = createPinia();
  setActivePinia(pinia);
  const auth = useAuthStore();
  cy.fixture('tokens/rpt.json').then((token) => {
    Cypress.log({ name: 'Login', message: 'Loaded rpt fixture.' });
    auth.setRpt(token.rpt);
  });
  Cypress.log({ name: 'Login', message: 'Loaded organization fixture.' });
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName === 'OrganizationsQuery') {
      const results = [
        organization,
      ];
      if (multipleOrganizations) {
        results.push(organizationBlueshoe);
      }
      if (noOrganization) {
        results.splice(0, results.length);
      }
      Cypress.log({ name: 'Login', message: `Login with ${results.length} joined organizations.` });
      req.reply({
        data: {
          allOrganizations: {
            results,
          },
        },
      });
    }
  });
  const context = useContextStore();
  if (!emptyStore) {
    if (organizationContext) {
      Cypress.log({ name: 'Login', message: 'Setting specified organization in store.' });
      context.setOrganization(organizationContext);
    } else {
      Cypress.log({ name: 'Login', message: 'Setting organization in store.' });
      context.setOrganization(organization);
    }
  } else {
    Cypress.log({ name: 'Login', message: 'Resetting organization in store.' });
    context.setOrganization(null);
  }
  cy.stub(auth, 'refresh').resolves(true).as('updateToken');

  cy.on('window:before:load', (window) => {
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    window.__pinia_store__ = pinia;
  });
});
