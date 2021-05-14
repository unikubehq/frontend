describe('Logs into the app', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('user').then(() => {
      cy.visit('http://localhost:8080/overview');
    });
    cy.viewport('macbook-15');
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
                title: 'Unikube Cypress Project', description: 'Description', currentCommit: '', currentCommitDateTime: null, id: '3b181df7-e91c-4a5b-9020-4d1c22636361', packages: [], sops: [], __typename: 'ProjectNode',
              }, {
                title: 'FondsFinanz', description: 'desc', currentCommit: '', currentCommitDateTime: null, id: 'b6138eac-1fd7-487e-8cac-82ef47324fc9', packages: [], sops: [], __typename: 'ProjectNode',
              }],
              __typename: 'ProjectNodePage',
            },
          },
        });
      }
    });
  });
});
