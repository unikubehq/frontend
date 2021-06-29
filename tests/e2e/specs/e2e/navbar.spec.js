describe('Navbar', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
  });

  it('displays single organization in dropdown', () => {
    // Login with user which has joined 1 organization.
    cy.login();
    cy.visit('/overview');
    cy.get('.organization-dropdown--item').click();
    cy.get('.organization-dropdown .v-list .v-list-item').should('have.length', 3);
    cy.get('.organization-dropdown .v-list .v-list-item').first().should('contain', 'Unikube');
  });

  it('it sets the organization member role for the current organization', () => {
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.clock();
    cy.wait('@Overview');
    cy.tick(500);
    cy.get('.profile-dropdown .d-flex > .text-capitalize').should('contain', 'member');
  });

  it('displays 2 organizations in dropdown', () => {
    // Login with user which has joined 2 organizations.
    cy.login(true);
    cy.visit('/overview');
    cy.get('.organization-dropdown--item').click();
    cy.get('.organization-dropdown .v-list .v-list-item').should('have.length', 4);
    cy.get('.organization-dropdown .v-list .v-list-item').first().should('contain', 'Unikube');
    cy.get('.organization-dropdown .v-list .v-list-item').eq(1).should('contain', 'Blueshoe');
  });

  it('redirects to create organization view when user has not joined any organization', () => {
    // Login with user which has not joined any organization.
    cy.login(false, true);
    cy.visit('/overview');
    cy.location('pathname').should('eq', '/intro');
  });

  it('sets first available organization when no context (store) organization is set. ', () => {
    // Login without prepared store.
    cy.login(true, false, true);
    cy.visit('/overview');
    cy.get('.organization-dropdown--item .v-list-item__content').should('contain', 'Unikube');
  });

  it('sets first available organization when current organization is not available anymore', () => {
    // Login without prepared store and unknown organization set.
    cy.login(true, false, false, {
      id: '4150dd69-1111-1111-1111-708294e427cd',
      title: 'Unokube',
      description: '',
      avatarImage: null,
      __typename: 'OrganizationNode',
    });
    cy.visit('/overview');
    cy.get('.organization-dropdown--item .v-list-item__content').should('contain', 'Unikube');
  });

  it('sets organization from localstorage stored ID', () => {
    cy.login(true, false, true);
    localStorage.setItem('contextOrganization', JSON.stringify('4150dd69-b183-4f8d-96b7-708294e427cd'));
    cy.visit('/overview');
    cy.get('.organization-dropdown--item .v-list-item__content').should('contain', 'Blueshoe');
  });

  it('updates dropdown menu when organization is chosen from menu', () => {
    cy.login(true, false, false);
    cy.visit('/overview');
    cy.get('.organization-dropdown--item .v-list-item__content').should('contain', 'Unikube');
    cy.get(':nth-child(1) > .project-card__wrapper > .px-7 > a > .v-icon > .v-icon__component').click();
    cy.location('pathname').should('contain', '/project/');
    cy.get('.organization-dropdown--item').click();
    cy.get('.v-menu__content > .v-list > :nth-child(2)').click();
    cy.get('.organization-dropdown--item .v-list-item__content').should('contain', 'Blueshoe');
    cy.location('pathname').should('eq', '/overview');
  });

  it('updates localstorage sidebarExpanded flag when toggled', () => {
    // Login without prepared store.
    cy.login();
    cy.visit('/overview');
    cy.get('.v-navigation-drawer .v-navigation-drawer__prepend .v-btn').click().should(() => {
      expect(localStorage.getItem('sidebarExpanded')).eq('false');
    });
    cy.get('.v-navigation-drawer .v-navigation-drawer__prepend .v-btn').click().should(() => {
      expect(localStorage.getItem('sidebarExpanded')).eq('true');
    });
  });
});
