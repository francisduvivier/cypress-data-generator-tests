import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { apis, OkUUIDResponse } from '../../../src/test-data-generator-api.ts';

const apiHelper = apis.uuid;
const apiPath = apiHelper.path;
const apiUUIDUrl = `${Cypress.env('apiUrl')}${apiPath}`;
const amountParamName = 'amount';
const versionParamName = 'version';

describe.only('UUID API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('Happy path', () => {
    const options = apiHelper.paramGenerator[amountParamName];
    const amounts = [
      options[0],
      options[Math.floor(options.length / 2)],
      options.at(-1),
    ];
    const versions = apiHelper.paramGenerator[versionParamName];
    for (const amount of amounts) {
      for (const version of versions) {
        const params = new URLSearchParams();
        params.set(versionParamName, String(version));
        params.set(amountParamName, String(amount));
        const paramString = params.toString();
        it(`GET ${apiPath}?${paramString}`, () => {
          cy.request('GET', `${apiUUIDUrl}?${paramString}`).then((response) => {
            expect(response.status).to.eq(200);
            const body = response.body as OkUUIDResponse;
            const uuids = body?.uuids;
            expect(uuids?.length).to.eq(amount);
            for (const generatedUuid of uuids) {
              expect(uuidValidate(generatedUuid)).to.be.true;
              expect(uuidVersion(generatedUuid)).to.eq(version);
            }
          });
        });
      }
    }
  });

  context('edge cases', () => {});

  xcontext('invalid input -> BUG -> Expected Failures', () => {
    const options = apiHelper.paramGenerator[amountParamName];
    const amounts = [options[0]! - 1, options.at(-1)! + 1].map(String);
    const versions = apiHelper.paramGenerator[versionParamName].map(String);
    for (const amount of amounts) {
      for (const version of versions) {
        const params = new URLSearchParams();
        params.set(versionParamName, version);
        params.set(amountParamName, amount);
        const paramString = params.toString();
        it(`GET ${apiPath}?${paramString}`, () => {
          cy.request('GET', `${apiUUIDUrl}?${apiUUIDUrl}`).then((response) => {
            expect(response.status).to.eq(400); // Bad content Status code
          });
        });
      }
    }
  });
});
