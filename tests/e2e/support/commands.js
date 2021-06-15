// eslint-disable-next-line import/no-extraneous-dependencies
import store from '@/store';

Cypress.Commands.add('login', (multipleOrganizations, noOrganization) => {
  // Setup store
  cy.fixture('tokens/rpt.json').then((token) => {
    Cypress.log({ name: 'Login', message: 'Loaded rpt fixture.' });
    store.commit(
      'auth/setRpt',
      token.rpt,
    );
  });
  cy.fixture('organizations/organization.json').then((organization) => {
    cy.fixture('organizations/organization_blueshoe.json').then((organizationBlueshoe) => {
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
          req.reply({
            data: {
              allOrganizations: {
                results,
              },
            },
          });
        }
      });
      store.commit(
        'context/setOrganization',
        organization,
      );
    });
  });
  // Attach store to window before load.
  cy.on('window:before:load', (window) => {
    window.__store__ = store;
  });
});
