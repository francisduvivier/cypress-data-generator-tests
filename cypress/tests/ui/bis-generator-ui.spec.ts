import '../../support/commands.ts';
import { paramSamples } from '../../support/bis/bis-param-samples.ts';
import {
  xPathForInputInForm,
  xPathForInputInFormDiv,
} from '../../support/ui-utils.ts';

const { baseUrl } = Cypress.config();
const generatorId = 'bis';

// TODO Move setBooleanParam to commands
function setBooleanParam(
  booleanParam:
    | {
        nokValues: readonly [number, string];
        name: 'isBirthdateKnown';
        okValues: readonly [boolean, boolean];
      }
    | {
        nokValues: readonly [number, string];
        name: 'isGenderKnown';
        okValues: readonly [boolean, boolean];
      },
  choice: boolean
) {
  const paramName = booleanParam.name;
  const choiceXpath = xPathForInputInForm(
    paramName,
    `radio`,
    generatorId,
    choice
  );

  const otherChoiceXpath = xPathForInputInForm(
    paramName,
    `radio`,
    generatorId,
    !choice
  );
  it(`can set the ${paramName} toggle to ${choice}`, () => {
    cy.xpath(choiceXpath).click();
    cy.xpath(choiceXpath)
      .should('exist') // You can use any Cypress assertions here
      .click(); // For example, you can click on the radio button if needed
    cy.xpath(choiceXpath).should('be.checked');
    cy.xpath(otherChoiceXpath).should('not.be.checked');
  });
}

// TODO Move setAmount to commands
function setAmount(value: 1) {
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.amount.name, 'number', generatorId)
  ).should('be.visible');
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.amount.name, 'number', generatorId)
  ).type(String(value));
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.amount.name, 'number', generatorId)
  ).should('have.value', String(value));
}

// TODO Move setDate to commands
function setDate(date: '2000-11-15') {
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.date.name, 'date', generatorId)
  ).should('be.visible');
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.date.name, 'date', generatorId)
  ).type(date);
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.date.name, 'date', generatorId)
  ).then((item) => {
    expect(item.val()).to.eq(date);
  });
}

// TODO Move clickGenerate to commands
function clickGenerate() {
  const buttonSelector = '#\\/' + generatorId + '-generate-button';
  cy.get(buttonSelector).should('be.visible');
  cy.get(buttonSelector).click();
  const textSelector = '#' + generatorId + '-text';
  cy.get(textSelector).should('be.visible');
  return textSelector;
}

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
    // Test Radio button responsiveness for all radio buttons
    for (const booleanParam of [
      paramSamples.isBirthdateKnown,
      paramSamples.isGenderKnown,
    ]) {
      for (const choice of booleanParam.okValues) {
        setBooleanParam(booleanParam, choice);
      }
    }
    it('Should be able to fill an amount', () => {
      const value = paramSamples.amount.okValues[0];
      setAmount(value);
    });
    it('Should be able to select a date', () => {
      const date = paramSamples.date.okValues[0];
      setDate(date);
    });
    it('Should be able to use the generate button', () => {
      const textSelector = clickGenerate();
      cy.get(textSelector).should('not.be.empty');
    });
  });
  context('API interaction test suite', () => {
    // TODO implement for okValues amount
    // TODO implement for okValues of date
    // TODO implement for okValues of isBirthdateKnown
    // TODO implement for okValues of isGenderKnown
  });
});
