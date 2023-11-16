Cypress.Commands.add('decollapseGenerator', (generatorId: string) => {
  const headerSelector = `[id="/${generatorId}-header-button"]`;
  cy.get(headerSelector).then(($item) => {
    // Check if the item exists
    if ($item.hasClass('collapsed')) {
      cy.log('before decollapseGenerator click');
      $item.click();
    }
    cy.get(headerSelector)
      .children() // Select all children of the collapsable element
      .should('not.have.class', 'collapsing');
    cy.log('decollapseGenerator not.have.class start');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(headerSelector).should('not.have.class', 'collapsed');
  });
});

Cypress.Commands.add('collapseGenerator', (generatorId: string) => {
  const headerSelector = `[id="/${generatorId}-header-button"]`;
  cy.get(headerSelector).then(($item) => {
    // Check if the item exists
    if (!$item.hasClass('collapsed')) {
      cy.log('before decollapseGenerator click');
      $item.click();
    }
  });
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get(headerSelector).should('have.class', 'collapsed');
});
