import { BisOkReponse, BisParams } from '../support-types';

export const responseVerifiers = {
  okVerifier: (params: BisParams, response: Cypress.Response<BisOkReponse>) => {
    expect(response.status).to.eq(200);
    const body = response.body as BisOkReponse;
    const bis = body?.bis;
    expect(bis?.length).to.eq(Number(params!.amount));
    for (const generatedBis of bis) {
      expect(
        generatedBis,
        'Message should consist of 11 numbers with dashes in between'
      ).to.match(/[0-9]{11}/);
      if (
        params!.isBirthdateKnown &&
        params!.isGenderKnown == null &&
        params!.date
      ) {
        const reversedBirthDay = params!.date.slice(2);
        expect(
          generatedBis,
          'first part should be the birthday in reverse'
        ).to.match(new RegExp(`^${reversedBirthDay?.replaceAll('-', '')}`));
      }
    }
  },
  nokVerifier: (
    params: BisParams,
    response: Cypress.Response<BisOkReponse>
  ) => {
    expect(response.status).to.eq(400); // Bad Status
  },
};
