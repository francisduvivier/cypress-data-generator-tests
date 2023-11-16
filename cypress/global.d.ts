/* eslint-disable no-undef */
/// <reference types="cypress" />

declare namespace Cypress {
  interface CustomWindow extends Window {}

  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    // eslint-disable-next-line no-unused-vars
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

    decollapseGenerator(
      // eslint-disable-next-line no-unused-vars
      generatorId: string,
      // eslint-disable-next-line no-unused-vars
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
  }
}
