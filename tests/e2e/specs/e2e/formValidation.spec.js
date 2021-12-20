describe('Form Validation', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.setupInterceptors();
      cy.login();
    });
  
    it('validates project creation form correctly', () => {
        cy.visit('/create-project');
        cy.get('.projectForm__submit').should('be.disabled');

        cy.get('[name="specRepo"]').type('123').blur();
        cy.get('[name="specRepo"]').siblings('label').should('have.class', 'error--text');

        cy.get('[name="specRepo"]').clear().type('https://google.com').blur();
        cy.get('[name="specRepo"]').siblings('label').should('not.have.class', 'error--text');

        cy.get('[name="specRepoBranch"]').clear().blur();
        cy.get('[name="specRepoBranch"]').siblings('label').should('have.class', 'error--text');

        cy.get('[name="specRepoBranch"]').type('master').blur();
        cy.get('[name="specRepoBranch"]').siblings('label').should('not.have.class', 'error--text');

        cy.get('[name="projectName"]').type('Title').blur();

        cy.get('.projectForm__submit').should('not.be.disabled');
    });

    it('validates orga member form correctly', () => {
        cy.visit('/settings/roles');
        cy.get('v-btn').should('be.disabled');

        cy.get('[name="email"]').type('123').blur();
        cy.get('[name="email"]').siblings('label').should('have.class', 'error--text');

        cy.get('[name="email"]').clear().type('test@unikube.io').blur();
        cy.get('[name="email"]').siblings('label').should('not.have.class', 'error--text');

        cy.get('v-btn').should('not.be.disabled');
    });
  });
  