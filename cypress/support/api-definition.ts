import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { OkResponse, Params } from '../../src/test-data-generator-api.ts';

export const apiDefinitions = {
  uuid: {
    path: '/Prod//uuid' as const,
    params: {
      version: {
        name: 'version',
        okValues: [1, 3, 4, 5] as const,
        nokValues: [-1, 0, 6] as const,
      },
      amount: {
        name: 'amount',
        nokValues: [0, -1, 101] as const,
        okValues: [1, 5, 100],
      },
    },

    okVerifier: (
      params: Params<'/Prod//uuid'>,
      response: Cypress.Response<OkResponse<'/Prod//uuid'>>
    ) => {
      expect(response.status).to.eq(200);
      const body = response.body as OkResponse<'/Prod//uuid'>;
      const uuids = body?.uuids;
      expect(uuids?.length).to.eq(Number(params!.amount));
      for (const generatedUuid of uuids) {
        expect(uuidValidate(generatedUuid)).to.be.true;
        expect(uuidVersion(generatedUuid)).to.eq(Number(params!.version));
      }
    },
    nokVerifier: (
      params: Params<'/Prod//uuid'>,
      response: Cypress.Response<OkResponse<'/Prod//uuid'>>
    ) => {
      expect(response.status).to.eq(400); // Bad Status
    },
  },
};

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
  ) => void,
  versionParamName: string,
  amountParamName: string,
  apiPath: string,
  apiUUIDUrl: string
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
