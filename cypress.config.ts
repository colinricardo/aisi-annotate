import { defineConfig } from "cypress";
import * as path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });
    },
    screenshotOnRunFailure: false,
    video: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            "@frontend": path.resolve(__dirname, "./src/frontend"),
            "@backend": path.resolve(__dirname, "./src/backend"),
            "@shared": path.resolve(__dirname, "./src/shared"),
          },
        },
      },
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
});
