import { OkResponse, Params } from '../../src/test-data-generator-api.ts';
import { apiDefinitions } from './api-definition.ts';

const apiHelper = apiDefinitions.uuid;
const apiPath = apiHelper.path;
const apiUUIDUrl = `${Cypress.env('apiUrl')}${apiPath}`;

/**
 * @function verifyCombinations
 * This function creates it cases to verify that the combinations of the given
 * inputs will have a correct response according to the verifier function.
 */
export function verifyCombinations(
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
      params.set(apiHelper.params.version.name, String(version));
      params.set(apiHelper.params.amount.name, String(amount));
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
