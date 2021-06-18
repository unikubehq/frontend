import invites from '../../fixtures/organizations/invites.json';

describe('Intro', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.intercept('POST', '/graphql', (req) => {
      // This is needed in order to prevent error handler overlay.
      if (req.body.operationName === 'UserInvitationsQuery') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'UserInvitationsQuery';
        req.reply({
          data: invites,
        });
      }
    });
  });

  it('Displays create and join organization cards', () => {
    cy.visit('/intro');
    cy.get('.v-card__text h1').first().should('contain', 'Create');
    cy.get('.v-card__text h1').last().should('contain', 'Join');
  });

  it('Has back to overview link', () => {
    cy.visit('/intro');
    cy.get('.link--secondary').click();
    cy.location('pathname').should('equal', '/overview');
  });

  it('Displays pending invites', () => {
    cy.visit('/intro');
    cy.wait('@UserInvitationsQuery');
    cy.get('.invites__list-item').first().should('contain', invites.userInvitations.results[0].organization.title);
  });

  it('Updates invitations when accepted', () => {
    cy.visit('/intro');
    cy.wait('@UserInvitationsQuery');
    cy.intercept('POST', '/graphql', (req) => {
      // This is needed in order to prevent error handler overlay.
      if (req.body.operationName === 'UserInvitationsQuery') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'UserInvitationsQuery2';
        req.reply({
          data: {
            userInvitations: {
              results: [],
            },
          },
        });
      }
      if (req.body.operationName === 'AnswerInvitation') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'AnswerInvitation';
        req.reply({
          data: {
            answerInvitation: {
              ok: true,
            },
          },
        });
      }
    });
    cy.get('.invites__list button.primary').first().click();
    cy.wait('@UserInvitationsQuery2');
    cy.get('.invites__list').should('not.exist');
  });

  it('Allows to create an organization', () => {
    const organizationName = 'New Organization Name';
    cy.intercept('POST', '/graphql', (req) => {
      // This is needed in order to prevent error handler overlay.
      if (req.body.operationName === 'CreateOrganizationMutation') {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'CreateOrganizationMutation';
        req.reply({
          data: {
            createUpdateOrganization: {
              organization: {
                id: '12312312312321321',
                title: organizationName,
                description: '',
              },
            },
          },
        });
      }
    });
    cy.visit('/intro');
    cy.get('button.primary').first().click();
    cy.get('#organizationName').type(organizationName);
    cy.get('button.primary').click();
    cy.wait(500);
    cy.get('button.primary').click();
  });
});
