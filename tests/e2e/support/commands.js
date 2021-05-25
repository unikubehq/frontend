// eslint-disable-next-line import/no-extraneous-dependencies
import store from '@/store';

Cypress.Commands.add('login', () => {
  // Setup store
  cy.fixture('tokens/rpt.json').then((token) => {
    Cypress.log({ name: 'Login', message: 'Loaded rpt fixture.' });
    store.commit(
      'auth/setRpt',
      token.rpt,
    );
  });
  cy.fixture('organizations/organization.json').then((organization) => {
    Cypress.log({ name: 'Login', message: 'Loaded organization fixture.' });
    store.commit(
      'context/setOrganization',
      organization,
    );
  });
  // Attach store to window before load.
  cy.on('window:before:load', (window) => {
    window.__store__ = store;
  });
});
