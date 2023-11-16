describe('New Transaction', () => {
  it('loads the page', () => {
    cy.get('head').should('not.be.visible');
  });
  context('Opens random data generator TODO_RDG_TITLE', () => {
    beforeEach(() => {});
    it('Should be able to check the body element', () => {
      cy.get('body').should('be.visible');
    });
  });
});
