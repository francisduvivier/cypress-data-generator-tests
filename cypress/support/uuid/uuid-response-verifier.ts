import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { UuidOkReponse, UuidParams } from '../support-types';

export const responseVerifiers = {
  okVerifier: (
    params: UuidParams,
    response: Cypress.Response<UuidOkReponse>
  ) => {
    expect(response.status).to.eq(200);
    const body = response.body as UuidOkReponse;
    const uuids = body?.uuids;
    expect(uuids?.length).to.eq(Number(params!.amount));
    for (const generatedUuid of uuids) {
      expect(uuidValidate(generatedUuid)).to.be.true;
      expect(uuidVersion(generatedUuid)).to.eq(Number(params!.version));
    }
  },
  nokVerifier: (
    params: UuidParams,
    response: Cypress.Response<UuidOkReponse>
  ) => {
    expect(response.status).to.eq(400); // Bad Status
  },
};
