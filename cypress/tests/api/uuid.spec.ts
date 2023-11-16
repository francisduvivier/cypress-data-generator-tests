import { addVerifyCombinationsTests } from '../../support/uuid/uuid-verification-its.ts';
import { paramSamples } from '../../support/uuid/uuid-param-samples.ts';
import { responseVerifiers } from '../../support/uuid/uuid-response-verifier.ts';

describe('UUID API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('Happy path', () => {
    const amounts = paramSamples.amount.okValues;
    const versions = paramSamples.version.okValues;
    const verifier = responseVerifiers.okVerifier;
    addVerifyCombinationsTests(amounts, versions, verifier);
  });
});
