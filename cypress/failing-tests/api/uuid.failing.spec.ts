import { addVerifyCombinationsTests } from '../../support/uuid/uuid-verification-its.ts';
import { paramSamples } from '../../support/uuid/uuid-param-samples.ts';
import { responseVerifiers } from '../../support/uuid/uuid-response-verifier.ts';

describe('UUID API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('invalid input -> BUG -> Expected Failures', () => {
    context('invalid version', () => {
      const options = paramSamples.amount.nokValues;
      const versions = paramSamples.version.okValues;
      const verifier = responseVerifiers.nokVerifier;
      addVerifyCombinationsTests(options, versions, verifier);
    });
    context('invalid amount', () => {
      const amounts = paramSamples.amount.okValues;
      const versions = paramSamples.version.nokValues;
      const verifier = responseVerifiers.nokVerifier;
      addVerifyCombinationsTests(amounts, versions, verifier);
    });
    context('all params invalid', () => {
      const amounts = paramSamples.amount.nokValues;
      const versions = paramSamples.version.nokValues;
      const verifier = responseVerifiers.nokVerifier;
      addVerifyCombinationsTests(amounts, versions, verifier);
    });
  });
});
