describe('Navbar', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.fixture('projects/allProjectsQuery.json').then((allProjects) => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'ProjectsQuery') {
          req.reply({
            data: allProjects,
          });
        }
      });
    });
  });

  it('displays single organization in dropdown', () => {
    cy.login();
    cy.visit('/overview');
    cy.get('.organization-dropdown--item').click();
    cy.get('.organization-dropdown .v-list .v-list-item').should('have.length', 3);
    cy.get('.organization-dropdown .v-list .v-list-item').first().should('contain', 'Unikube');
  });

  it('displays 2 organizations in dropdown', () => {
    cy.login(true);
    cy.visit('/overview');
    cy.get('.organization-dropdown--item').click();
    cy.get('.organization-dropdown .v-list .v-list-item').should('have.length', 4);
    cy.get('.organization-dropdown .v-list .v-list-item').first().should('contain', 'Unikube');
    cy.get('.organization-dropdown .v-list .v-list-item').eq(1).should('contain', 'Blueshoe');
  });

  it('redirects to create organization view when user has not joined any organization', () => {
    cy.login(false, true);
    cy.visit('/overview');
    cy.location('pathname').should('eq', '/intro');
  });
});
