// eslint-disable-next-line import/no-extraneous-dependencies
import store from '@/store';
import organization from '../fixtures/organizations/organization.json';
import organizationBlueshoe from '../fixtures/organizations/organization_blueshoe.json';
import allProjects from '../fixtures/projects/allProjectsQuery.json';
import rptMember from '../fixtures/organizations/rpt_member.json';

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

Cypress.Commands.add('login', (multipleOrganizations, noOrganization, emptyStore, organizationContext, noStub) => {
  // Setup store
  cy.fixture('tokens/rpt.json').then((token) => {
    Cypress.log({ name: 'Login', message: 'Loaded rpt fixture.' });
    store.commit(
      'auth/setRpt',
      token.rpt,
    );
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
  if (!emptyStore) {
    if (organizationContext) {
      Cypress.log({ name: 'Login', message: 'Setting specified organization in store.' });
      store.commit(
        'context/setOrganization',
        organizationContext,
      );
    } else {
      Cypress.log({ name: 'Login', message: 'Setting organization in store.' });
      store.commit(
        'context/setOrganization',
        organization,
      );
    }
  } else {
    Cypress.log({ name: 'Login', message: 'Resetting organization in store.' });
    store.commit(
      'context/setOrganization',
      null,
    );
  }
  if (!noStub) {
    cy.stub(store, 'dispatch').withArgs('auth/refresh').resolves(true).as('updateToken');
  }
  // Attach store to window before load.
  cy.on('window:before:load', (window) => {
    window.__store__ = store;
  });
});
