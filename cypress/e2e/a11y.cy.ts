import { Result } from "axe-core";

// log violations to console
function terminalLog(violations: Result[]) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
      element: nodes[0].target,
    })
  );

  cy.task("table", violationData);
}

// in real life we'd have to run these tests on every page
// but it's a pain in ass to get it working with authenticated pages
// and i dont have time right now
describe("accessibility tests", () => {
  it("has no detectable accessibility violations on home page", () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, terminalLog);
  });

  it("has no detectable accessibility violations on sign-in page", () => {
    cy.visit("/sign-in");
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, terminalLog);
  });

  it("has no detectable accessibility violations on sign-up page", () => {
    cy.visit("/sign-up");
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, terminalLog);
  });
});
