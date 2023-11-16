import '../../support/commands.ts';
import { paramSamples } from '../../support/bis/bis-param-samples.ts';
import {
  xPathForInputInForm,
  xPathForInputInFormDiv,
} from '../../support/ui-utils.ts';
import { BisParamName, BisParams } from '../../support/support-types';

const { baseUrl } = Cypress.config();
const generatorId = 'bis';

const paramSetter: { [key in BisParamName]: (val: any) => unknown } = {
  amount: setAmount,
  date: setDate,
  isGenderKnown: (val: boolean) =>
    setBooleanParam(paramSamples.isGenderKnown, val),
  isBirthdateKnown: (val: boolean) =>
    setBooleanParam(paramSamples.isBirthdateKnown, val),
} as const;

// TODO Move setBooleanParam to commands
function setBooleanParam(
  booleanParam: {
    nokValues: readonly [number, string];
    name: BisParamName;
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
function setAmount(value: number) {
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.amount.name, 'number', generatorId)
  ).should('be.visible');
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.amount.name, 'number', generatorId)
  )
    .clear()
    .type(String(value));
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.amount.name, 'number', generatorId)
  ).should('have.value', String(value));
}

// TODO Move setDate to commands
function setDate(date: '2000-11-15') {
  cy.xpath(
    xPathForInputInFormDiv(paramSamples.date.name, 'date', generatorId)
  ).should('be.visible');
  if (date) {
    cy.xpath(
      xPathForInputInFormDiv(paramSamples.date.name, 'date', generatorId)
    ).type(date);
  } else {
    cy.xpath(
      xPathForInputInFormDiv(paramSamples.date.name, 'date', generatorId)
    ).clear();
  }
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

function setValuesAndVerifyGenerate(paramsValues: NonNullable<BisParams>) {
  for (const paramName of Object.keys(paramSetter) as BisParamName[]) {
    paramSetter[paramName](paramsValues[paramName]);
  }
  const textSelector = clickGenerate();
  cy.get(textSelector).should('not.be.empty');
  // TODO Extend test to check amount in ui
  // TODO Extend test to check api call made
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
    for (const varyingParam of Object.values(paramSamples)) {
      context(`Test ${varyingParam.name} variation`, () => {
        for (const value of varyingParam.okValues) {
          it(`Should generate data when setting ${varyingParam.name} to ${value}`, () => {
            const paramsValues = {
              amount: paramSamples.amount.okValues[0],
              date: paramSamples.date.okValues[0],
              isGenderKnown: paramSamples.isGenderKnown.okValues[0],
              isBirthdateKnown: paramSamples.isBirthdateKnown.okValues[0],
            };
            (paramsValues as any)[varyingParam.name] = value;
            setValuesAndVerifyGenerate(paramsValues);
          });
        }
      });
    }
  });
});
