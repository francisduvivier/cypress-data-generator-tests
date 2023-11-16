Cypress.Commands.add('decollapseGenerator', (generatorId: string) => {
  cy.get(`[id="/${generatorId}-header-button"]`).then(($item) => {
    if ($item.length > 0) {
      // Check if the item exists
      if ($item.hasClass('collapsed')) {
        // Check if it has the specified class, and if so, trigger a click event to remove the class
        $item.click();
      }
    }
  });
});
