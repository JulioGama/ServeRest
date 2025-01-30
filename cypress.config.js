const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eventos de node aqui
    },
    video: false,
    screenshotOnRunFailure: true,
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720
  },
});
