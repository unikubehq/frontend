describe('Store: Auth Module', () => {
  let store = null;
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(false, false, false, false, true);
    cy.visit('/overview');
    cy.window().its('app.$store').then((s) => { store = s; });
  });

  it('sets the decoded rpt and decoded information username, email, uuid', () => {
    console.log(store);
    cy.fixture('tokens/rpt.json').then((token) => {
      store.commit('auth/setRpt', token.rpt);
      expect(store.state.auth.rpt.name).to.eq('Max Mustermann');
      expect(store.state.auth.rpt.email).to.eq('max@example.com');
      expect(store.state.auth.rpt.sub).to.eq('0be9fc83-3cea-47ec-a850-176ea074f749');
      expect(store.state.auth.username).to.eq('Max Mustermann');
      expect(store.state.auth.email).to.eq('max@example.com');
      expect(store.state.auth.uuid).to.eq('0be9fc83-3cea-47ec-a850-176ea074f749');
    });
  });

  it('sets avatar image url', () => {
    const imageUrl = 'https://unikube.io/avatar.jpg';
    store.commit('auth/setAvatar', imageUrl);
    expect(store.state.auth.avatarImage).to.eq(imageUrl);
  });

  it('sets keycloak client', () => {
    const keycloakClient = { client: true };
    store.commit('auth/setKeycloakClient', keycloakClient);
    expect(store.state.auth.client.client).to.eq(true);
  });

  it('Sets a new token on refresh', () => {
    store.commit('auth/setKeycloakClient', {
      updateToken: async () => new Promise((resolve) => {
        resolve(true);
      }),
    });
    cy.stub(store, 'commit').withArgs('auth/setRpt').as('setRpt');
    store.dispatch('auth/refresh');
    cy.get('@setRpt').should('have.been.called');
  });

  it('Schedules the next refresh when refresh was successful', () => {
  });

  it('Returns promise whether refresh was successful.', () => {
  });

  // Actions
  // refresh
  // logout
  // scheduleRefresh

  // Getters
  // caslRules
});
