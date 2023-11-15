import { apiDefinitions } from '../../support/api-definition.ts';
import { verifyCombinations } from '../../support/uuid-validations.ts';

const apiHelper = apiDefinitions.uuid;

describe.only('UUID API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('Happy path', () => {
    const amounts = apiHelper.params.amount.okValues;
    const versions = apiHelper.params.version.okValues;
    const verifier = apiHelper.okVerifier;
    verifyCombinations(amounts, versions, verifier);
  });
});
