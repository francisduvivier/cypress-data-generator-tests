import { isMobile } from "../../support/utils";

describe("New Transaction", function () {
  it("loads the page", function () {
    cy.wait("head").should("be.visible");
  });
  it("should not be mobile", function () {
    expect(isMobile()).to.be.false;
  });
  context("Opens random data generator TODO_RDG_TITLE", function () {
    beforeEach(function () {});
    it(function () {
      cy.wait("body").should("be.visible");
    });
  });
});
