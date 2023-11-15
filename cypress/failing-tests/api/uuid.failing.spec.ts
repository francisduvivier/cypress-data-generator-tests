import { apiDefinitions } from '../../support/api-definition.ts';
import { verifyCombinations } from '../../support/uuid-validations.ts';

const apiHelper = apiDefinitions.uuid;

describe.only('UUID API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('invalid input -> BUG -> Expected Failures', () => {
    context('invalid version', () => {
      const options = apiHelper.params.amount.nokValues;
      const versions = apiHelper.params.version.okValues;
      const verifier = apiHelper.nokVerifier;
      verifyCombinations(options, versions, verifier);
    });
    context('invalid amount', () => {
      const amounts = apiHelper.params.amount.okValues;
      const versions = apiHelper.params.version.nokValues;
      const verifier = apiHelper.nokVerifier;
      verifyCombinations(amounts, versions, verifier);
    });
    context('all params invalid', () => {
      const amounts = apiHelper.params.amount.nokValues;
      const versions = apiHelper.params.version.nokValues;
      const verifier = apiHelper.nokVerifier;
      verifyCombinations(amounts, versions, verifier);
    });
  });
});
