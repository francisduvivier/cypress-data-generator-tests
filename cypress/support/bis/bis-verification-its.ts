import { ApiPath } from '../../../src/test-data-generator-api.ts';
import { paramSamples } from './bis-param-samples.ts';
import { BisOkReponse, BisParams } from '../support-types';

const apiPath: ApiPath = '/Prod//bis';
const apiBISUrl = `${Cypress.env('apiUrl')}${apiPath}`;

/**
 * @function addVerifyCombinationsTests
 * This function creates it cases to verify that the combinations of the given
 * inputs will have a correct response according to the verifier function.
 */
export function addVerifyCombinationsTests(
  amounts: readonly number[],
  isGenderKnowns: readonly (boolean | undefined)[],
  isBirthdateKnowns: readonly (boolean | undefined)[],
  dates: readonly string[],
  verifier: (
    // eslint-disable-next-line no-unused-vars
    params: BisParams,
    // eslint-disable-next-line no-unused-vars
    response: Cypress.Response<BisOkReponse>
  ) => void
) {
  for (const isBirthdateKnown of isBirthdateKnowns) {
    for (const date of dates) {
      if (!!date !== !!isBirthdateKnown) {
        // if isBirthdateKnown then there should be a date and vice versa
        continue;
      }
      for (const amount of amounts) {
        for (const isGenderKnown of isGenderKnowns) {
          const params = new URLSearchParams();
          if (date !== undefined) {
            params.set(paramSamples.date.name, String(date));
          }
          if (isGenderKnown !== undefined) {
            params.set(paramSamples.isGenderKnown.name, String(isGenderKnown));
          }
          if (isBirthdateKnown !== undefined) {
            params.set(
              paramSamples.isBirthdateKnown.name,
              String(isBirthdateKnown)
            );
          }
          params.set(paramSamples.amount.name, String(amount));
          const paramString = params.toString();
          it(`GET ${apiPath}?${paramString}`, () => {
            cy.request({
              method: 'GET',
              url: `${apiBISUrl}?${paramString}`,
              failOnStatusCode: false,
            }).then((response: Cypress.Response<BisOkReponse>) => {
              verifier(
                {
                  date,
                  isGenderKnown,
                  amount,
                  isBirthdateKnown,
                },
                response
              );
            });
          });
        }
      }
    }
  }
}
