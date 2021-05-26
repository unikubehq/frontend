describe('Logs into the app', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
  });

  it('logs in and visits localhost', () => {
    cy.intercept('POST', '/graphql', (req) => {
      // eslint-disable-next-line no-prototype-builtins
      if (req.body.operationName === 'ProjectsQuery') {
        // eslint-disable-next-line no-param-reassign
        req.reply({
          data: {
            allProjects: {
              totalCount: 2,
              results: [{
                title: 'Unikube Cypress Project', description: 'Description', currentCommit: '', currentCommitDateTime: null, id: '3b181df7-e91c-4a5b-9020-4d1c22636361', decks: [], sops: [], __typename: 'ProjectNode', organization: { id: '5150dd69-b183-4f8d-96b7-708294e427ce' },
              }, {
                title: 'Awesome Blueshoe Project', description: 'desc', currentCommit: '', currentCommitDateTime: null, id: 'b6138eac-1fd7-487e-8cac-82ef47324fc9', decks: [], sops: [], __typename: 'ProjectNode', organization: { id: '5150dd69-b183-4f8d-96b7-708294e427ce' },
              }],
              __typename: 'ProjectNodePage',
            },
          },
        });
      }
    });
    cy.visit('/overview');
    cy.get('.project-card__wrapper').should('have.length', 2);
  });
});
