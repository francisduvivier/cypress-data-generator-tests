import '../../support/commands.ts';

const { baseUrl } = Cypress.config();
const generatorId = 'bis';

describe('Bis Id UI Test Suite', () => {
  before(() => {
    // Visit the page by combining baseUrl and the relative URL
    cy.visit(`${baseUrl}?search=${generatorId}`); // Replace 'your_relative_path_here' with the actual relative URL
  });
  beforeEach(() => {
    cy.decollapseGenerator(generatorId);
    cy.get('[id="/bis-no-0"]').should('be.visible');
  });
  it('can check body and head', () => {
    cy.get('head').should('not.be.visible');
    cy.get('body').should('be.visible');
    const choice = 'no'; // 'yes' or 'no'
    cy.get(`[id="/bis-${choice}-0"]`).click();
  });
});
