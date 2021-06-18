import allProjects from '../../fixtures/projects/allProjectsQuery.json';

describe('Overview', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.setupInterceptors();
  });

  it('it displays 2 projects', () => {
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.wait('@Overview');
    cy.wait('@ProjectsQuery');
    cy.get('.project-card__wrapper').should('have.length', 2);
  });

  it('orders projects correctly', () => {
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.wait('@Overview');
    cy.wait('@ProjectsQuery');

    cy.get('.project-card__wrapper h3').first().should('contain', 'Awesome Blueshoe Project');
    cy.get('.project-card__wrapper h3').last().should('contain', 'Unikube Cypress Project');
    cy.get('.projects__order-dropdown').click();
    cy.get('.v-menu__content .v-list-item').last().click();
    cy.get('.project-card__wrapper h3').first().should('contain', 'Unikube Cypress Project');
    cy.get('.project-card__wrapper h3').last().should('contain', 'Awesome Blueshoe Project');
    cy.get('.projects__order-dropdown').click();
    cy.get('.v-menu__content .v-list-item').first().click();
    cy.get('.project-card__wrapper h3').first().should('contain', 'Awesome Blueshoe Project');
    cy.get('.project-card__wrapper h3').last().should('contain', 'Unikube Cypress Project');
  });

  it('filter projects on search bar input', () => {
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.wait('@Overview');
    cy.wait('@ProjectsQuery');
    cy.get('.search__input').type('Unikube');
    cy.get('.project-card__wrapper').should('have.length', 1);
    cy.get('.project-card__wrapper h3').first().should('contain', 'Unikube Cypress Project');
  });

  it('refreshed project list on project delete', () => {
    cy.login(false, false, true);
    cy.intercept('/overview').as('Overview');
    cy.visit('/overview');
    cy.wait('@Overview');
    cy.wait('@ProjectsQuery');
    cy.get('.project-card__wrapper .project-card__delete').first().click();
    cy.get('.project-delete__modal-input').type(allProjects.allProjects.results[1].title);

    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ProjectsQuery') {
        const projects = allProjects;
        projects.allProjects.totalCount = 1;
        projects.allProjects.results.splice(1);
        // eslint-disable-next-line no-param-reassign
        req.alias = 'ProjectsQuery2';
        req.reply({
          data: projects,
        });
      }
      if (req.body.operationName === 'DeleteProject') {
        // eslint-disable-next-line no-param-reassign
        req.reply({
          data: {
            deleteProject: {
              ok: true,
            },
          },
        });
      }
    });
    cy.get('.project-delete__submit').click();
    cy.get('.project-card__wrapper').should('have.length', 1);
  });
});
