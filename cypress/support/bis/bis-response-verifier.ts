const BIS_MODULO = 97;
import { BisOkReponse, BisParams } from '../support-types';

function expectCorrectYearMonthDay(outputBis: any, params: BisParams) {
  const { year, month, day } = outputBis.match(
    /(?<year>\d\d)(?<month>\d\d)(?<day>\d\d)/
  ).groups;
  let inputDate;
  if (params!.date) {
    inputDate = params!.date.match(
      /\d\d(?<year>\d\d)-(?<month>\d\d)-(?<day>\d\d)/
    )!.groups as any;
    expect(
      year,
      `year [${year}] full output [${outputBis}] should always match up with inputDate [${
        params!.date
      }]`
    ).to.eq(inputDate.year);
    expect(
      day,
      `day [${day}] of full output [${outputBis}] should always match up with inputDate [${
        params!.date
      }]`
    ).to.eq(inputDate.day);
  }
  let expectedMonthNb = Number(inputDate?.month) || 0;
  if (!params?.isBirthdateKnown) {
    // The parameter isBirthdateKnown on False will set the date month to 00.
    expectedMonthNb = 0;
  }
  if (params?.isGenderKnown) {
    // While the parameter isGenderKnown will increase the month with 40 if set on True
    expectedMonthNb += 40;
  } else {
    // and with 20 if set on False.
    expectedMonthNb += 20;
  }
  expect(Number(month), 'Month should match the specificitions').to.eq(
    expectedMonthNb
  );
}

function expectEndingWithModulo(generatedBis: string, dateParam?: string) {
  const year = ((dateParam || undefined) && Number(dateParam!.slice(0, 4))) as
    | number
    | undefined;
  const start = generatedBis.slice(0, -2);
  const outputChecksum = Number(generatedBis.slice(-2));
  const mod2000 = BIS_MODULO - (Number('2' + start) % BIS_MODULO);
  const normalMod = BIS_MODULO - (Number(start) % BIS_MODULO);
  const debugMessage = `start ${start} should have correct checksum [${outputChecksum}], taking into account the year [${year}]`;
  if (year == undefined) {
    expect(
      mod2000 == outputChecksum || normalMod == outputChecksum,
      debugMessage
    ).to.be.true;
  } else if (year >= 2000) {
    expect(outputChecksum, debugMessage + ': ' + String(mod2000)).to.eq(
      mod2000
    );
  } else {
    expect(outputChecksum, debugMessage + ': ' + normalMod).to.eq(
      Number(normalMod)
    );
  }
}

function expectBisToComplyWithSpec(
  generatedBis: string | any,
  params:
    | {
        isGenderKnown?: boolean;
        isBirthdateKnown?: boolean;
        date?: string;
        amount?: number;
      }
    | undefined
) {
  expect(
    generatedBis,
    'Message should consist of 11 numbers with dashes in between'
  ).to.match(/[0-9]{11}/);
  expectCorrectYearMonthDay(generatedBis, params);
  expectEndingWithModulo(generatedBis, params?.date);
}

export const responseVerifiers = {
  okVerifier: (
    params: BisParams,
    response: Cypress.Response<BisOkReponse> | { body: BisOkReponse }
  ) => {
    if ((response as Cypress.Response<BisOkReponse>).status !== undefined) {
      expect((response as Cypress.Response<BisOkReponse>).status).to.eq(200);
    }
    const body = response.body as BisOkReponse;
    const bisValues = body?.bis;
    expect(bisValues?.length).to.eq(Number(params!.amount));

    for (const generatedBis of bisValues) {
      expectBisToComplyWithSpec(generatedBis, params);
    }
  },
  nokVerifier: (
    params: BisParams,
    response: Cypress.Response<BisOkReponse>
  ) => {
    expect(response.status).to.eq(400); // Bad Status
  },
};
