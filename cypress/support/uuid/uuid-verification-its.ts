import { ApiPath } from '../../../src/test-data-generator-api.ts';
import { paramSamples } from './uuid-param-samples.ts';
import { UuidOkReponse, UuidParams } from '../support-types';

const apiPath: ApiPath = '/Prod//uuid';
const apiUUIDUrl = `${Cypress.env('apiUrl')}${apiPath}`;

/**
 * @function addVerifyCombinationsTests
 * This function creates it cases to verify that the combinations of the given
 * inputs will have a correct response according to the verifier function.
 */
export function addVerifyCombinationsTests(
  amounts: readonly number[],
  versions: readonly number[],
  verifier: (
    // eslint-disable-next-line no-unused-vars
    params: UuidParams,
    // eslint-disable-next-line no-unused-vars
    response: Cypress.Response<UuidOkReponse>
  ) => void
) {
  for (const amount of amounts) {
    for (const version of versions) {
      const params = new URLSearchParams();
      params.set(paramSamples.version.name, String(version));
      params.set(paramSamples.amount.name, String(amount));
      const paramString = params.toString();
      it(`GET ${apiPath}?${paramString}`, () => {
        cy.request('GET', `${apiUUIDUrl}?${paramString}`).then(
          (response: Cypress.Response<UuidOkReponse>) => {
            verifier({ version, amount }, response);
          }
        );
      });
    }
  }
}
