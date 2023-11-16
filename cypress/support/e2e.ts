import 'cypress-xpath';

beforeEach(() => {
  // cy.intercept middleware to remove 'if-none-match' headers from all requests
  // to prevent the server from returning cached responses of API requests
  cy.intercept({ url: Cypress.env('apiUrl'), middleware: true }, (req) => {
    console.log('request to api made', req);
  });
});
