import { addVerifyCombinationsTests } from '../../support/bis/bis-verification-its.ts';
import { paramSamples } from '../../support/bis/bis-param-samples.ts';
import { responseVerifiers } from '../../support/bis/bis-response-verifier.ts';

describe('BIS API', () => {
  before(() => {
    // Advised workaround to have the e2e tests pass when cy.visit(baseUrl) is called
    cy.request('GET', '/');
  });

  context('Happy path', () => {
    const amounts = paramSamples.amount.okValues;
    const dates = paramSamples.date.okValues;
    const isGenderKnowns = paramSamples.isGenderKnown.okValues;
    const isBirthdateKnowns = paramSamples.isBirthdateKnown.okValues;
    const verifier = responseVerifiers.okVerifier;
    addVerifyCombinationsTests(
      amounts,
      isGenderKnowns,
      isBirthdateKnowns,
      dates,
      verifier
    );
  });

  xcontext('invalid input -> BUG -> Expected Failures', () => {
    const verifier = responseVerifiers.nokVerifier;
    context('invalid date', () => {
      const amounts = paramSamples.amount.okValues.slice(0, 1);
      const dates = paramSamples.date.nokValues;
      const isGenderKnowns = paramSamples.isGenderKnown.okValues.slice(0, 1);
      const isBirthdateKnowns = paramSamples.isBirthdateKnown.okValues.slice(
        0,
        1
      );
      addVerifyCombinationsTests(
        amounts,
        isGenderKnowns,
        isBirthdateKnowns,
        dates,
        verifier
      );
    });
    context('invalid amount', () => {
      const amounts = paramSamples.amount.nokValues;
      const dates = paramSamples.date.okValues.slice(0, 1);
      const isGenderKnowns = paramSamples.isGenderKnown.okValues.slice(0, 1);
      const isBirthdateKnowns = paramSamples.isBirthdateKnown.okValues.slice(
        0,
        1
      );
      addVerifyCombinationsTests(
        amounts,
        isGenderKnowns,
        isBirthdateKnowns,
        dates,
        verifier
      );
    });
    context('invalid isGenderKnown', () => {
      const amounts = paramSamples.amount.okValues.slice(0, 1);
      const dates = paramSamples.date.okValues.slice(0, 1);
      const isGenderKnowns = paramSamples.isGenderKnown.nokValues;
      const isBirthdateKnowns = paramSamples.isBirthdateKnown.okValues.slice(
        0,
        1
      );
      addVerifyCombinationsTests(
        amounts,
        // @ts-expect-error we are testing invalid input
        isGenderKnowns,
        isBirthdateKnowns,
        dates,
        verifier
      );
    });
    context('invalid isGenderKnown', () => {
      const amounts = paramSamples.amount.okValues.slice(0, 1);
      const dates = paramSamples.date.okValues.slice(0, 1);
      const isGenderKnowns = paramSamples.isGenderKnown.okValues.slice(0, 1);
      const isBirthdateKnowns = paramSamples.isBirthdateKnown.nokValues;
      addVerifyCombinationsTests(
        amounts,
        isGenderKnowns,
        // @ts-expect-error we are testing invalid input
        isBirthdateKnowns,
        dates,
        verifier
      );
    });
    context('all params invalid', () => {
      const amounts = paramSamples.amount.nokValues.slice(0, 1);
      const dates = paramSamples.date.nokValues.slice(0, 1);
      const isGenderKnowns = paramSamples.isGenderKnown.nokValues.slice(0, 1);
      const isBirthdateKnowns = paramSamples.isBirthdateKnown.nokValues.slice(
        0,
        1
      );
      addVerifyCombinationsTests(
        amounts,
        // @ts-expect-error we are testing invalid input
        isGenderKnowns,
        isBirthdateKnowns,
        dates,
        verifier
      );
    });
  });
});
