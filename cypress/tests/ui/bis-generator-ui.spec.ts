import '../../support/commands.ts';

const { baseUrl } = Cypress.config();
const generatorId = 'bis';

describe('Bis Id UI Test Suite', () => {
  before(() => {
    // Visit the page by combining baseUrl and the relative URL
    cy.visit(`${baseUrl}?search=${generatorId}`); // Replace 'your_relative_path_here' with the actual relative URL
  });

  beforeEach('it should make sure the generator is decollapsed', () => {
    cy.decollapseGenerator(generatorId);
  });
  context('UI responsiveness test suite', () => {
    it('should be able to collapse the generator', () => {
      cy.collapseGenerator(generatorId);
    });
    for (let i = 0; i < 2; i++) {
      const choices = ['yes', 'no'];
      for (let choiceIndex = 0; choiceIndex < 2; choiceIndex++) {
        const choice = choices[choiceIndex];
        const choiceSelector = `[id="/bis-${choice}-${i}"]`;
        const otherChoiceSelector = `[id="/bis-${
          choices[(choiceIndex + 1) % 2]
        }-${i}"]`;
        it(`can set the ${i ? 'second' : 'first'} toggle to ${choice}`, () => {
          cy.get('head').should('not.be.visible');
          cy.get('body').should('be.visible');
          cy.get(choiceSelector).click();
          cy.get(choiceSelector).should('be.checked');
          cy.get(otherChoiceSelector).should('not.be.checked');
        });
      }
    }
  });
});
