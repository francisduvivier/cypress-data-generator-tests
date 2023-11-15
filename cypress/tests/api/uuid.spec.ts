import { OkResponse, Params } from '../../../src/test-data-generator-api.ts';
import { apiDefinitions } from '../../support/api-definition.ts';

const apiHelper = apiDefinitions.uuid;
const apiPath = apiHelper.path;
const apiUUIDUrl = `${Cypress.env('apiUrl')}${apiPath}`;
const amountParamName = 'amount';
const versionParamName = 'version';

function verifyCombinations(
  amounts: readonly number[],
  versions: readonly number[],
  verifier: (
    // eslint-disable-next-line no-unused-vars
    params: Params<'/Prod//uuid'>,
    // eslint-disable-next-line no-unused-vars
    response: Cypress.Response<OkResponse<'/Prod//uuid'>>
  ) => void
) {
  for (const amount of amounts) {
    for (const version of versions) {
      const params = new URLSearchParams();
      params.set(versionParamName, String(version));
      params.set(amountParamName, String(amount));
      const paramString = params.toString();
      it(`GET ${apiPath}?${paramString}`, () => {
        cy.request('GET', `${apiUUIDUrl}?${paramString}`).then(
          (response: Cypress.Response<OkResponse<'/Prod//uuid'>>) => {
            verifier({ version, amount }, response);
          }
        );
      });
    }
  }
}

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

  context('edge cases', () => {});

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
