import { isMobile } from '../../support/utils.ts';

describe('New Transaction', () => {
  it('loads the page', () => {
    cy.get('head').should('not.be.visible');
  });
  it('should not be mobile', () => {
    expect(isMobile()).to.be.false;
  });
  context('Opens random data generator TODO_RDG_TITLE', () => {
    beforeEach(() => {});
    it('Should be able to check the body element', () => {
      cy.get('body').should('be.visible');
    });
  });
});
