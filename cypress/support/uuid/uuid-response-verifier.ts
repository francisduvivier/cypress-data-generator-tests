import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { OkResponse, Params } from '../../../src/test-data-generator-api.ts';

export const responseVerifiers = {
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
};
