import {
  apiDefinitions,
  verifyCombinations,
} from '../../support/api-definition.ts';

const apiHelper = apiDefinitions.uuid;
const apiPath = apiHelper.path;
const apiUUIDUrl = `${Cypress.env('apiUrl')}${apiPath}`;

describe.only('UUID API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('Happy path', () => {
    const amounts = apiHelper.params.amount.okValues;
    const versions = apiHelper.params.version.okValues;
    const verifier = apiHelper.okVerifier;
    verifyCombinations(
      amounts,
      versions,
      verifier,
      apiHelper.params.version.name,
      apiHelper.params.amount.name,
      apiPath,
      apiUUIDUrl
    );
  });
});
