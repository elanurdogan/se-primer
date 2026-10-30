const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 390,
    viewportHeight: 844,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on) {
      // Pencere yeterince büyük olunca telefon görünümü videoda %100 ölçekle kaydedilir.
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'electron') {
          launchOptions.preferences.width = 1300;
          launchOptions.preferences.height = 960;
        }
        return launchOptions;
      });
    },
  },
});
