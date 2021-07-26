import project from '../../fixtures/projects/cypressProject.json';

describe('Helm Overrides', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.wait('@Overview');
    cy.wait('@ProjectsQuery');
    cy.wait(3000);
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ProjectDetailQuery') {
        req.reply({
          data: project,
        });
      }
      if (req.body.operationName === 'CreateUpdateHelmOverridesMutation') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'CreateUpdateHelmOverridesMutation';
        req.reply(500);
      }
    });
    cy.get('.project-card__wrapper .project-card__detail').first().click();
    cy.location('pathname', { timeout: 3000 })
      .should('include', '/project');
    cy.get('.projectDeck button').first().click();
  });

  it('it show helm overrides button when schema is available', () => {
    cy.get('.helmOverridesButton').should('have.length', 1);
  });

  it('it opens editor when clicking on "override helm values" button', () => {
    cy.get('.helmOverridesButton').click();
    cy.get('.v-navigation-drawer__content .v-card__title').should('contain', 'Override Helm Values');
  });

  it('editor to contain loaded yaml', () => {
    cy.get('.helmOverridesButton').click();
    cy.get('.v-navigation-drawer__content .view-lines').should('contain', 'something');
    cy.get('.v-navigation-drawer__content .view-lines').should('contain', 'test');
  });

  it('adds snackbar error when saving helm overrides fails', () => {
    cy.get('.helmOverridesButton').click();
    cy.window((window) => {
      // eslint-disable-next-line no-underscore-dangle
      expect(window.__store__.state.context.messages).to.have.length(0);
    });

    cy.get('.v-navigation-drawer__content .v-btn.primary').click();
    cy.wait('@CreateUpdateHelmOverridesMutation');
    cy.window((window) => {
      // eslint-disable-next-line no-underscore-dangle
      expect(window.__store__.state.context.messages).to.have.length(1);
    });
  });

  it('hides when helm overrides have been successfully stored', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ProjectDetailQuery') {
        req.reply({
          data: project,
        });
      }
      if (req.body.operationName === 'CreateUpdateHelmOverridesMutation') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'CreateUpdateHelmOverridesMutation';
        req.reply({
          data: {
            ok: true,
          },
        });
      }
    });
    cy.get('.helmOverridesButton').click();

    cy.get('.v-navigation-drawer__content .v-btn.primary').click();
    cy.wait('@CreateUpdateHelmOverridesMutation');
    cy.get('.v-navigation-drawer__headline').should('not.be.visible');
  });

  it('prevents storing invalid YAML', () => {
    cy.get('.helmOverridesButton').click();
    cy.get('.v-navigation-drawer__content .v-btn.primary').as('saveButton');
    cy.get('@saveButton').should('not.be.disabled');
    cy.get('.inputarea.monaco-mouse-cursor-text').type('- ');
    cy.get('@saveButton').should('be.disabled');
  });
});
