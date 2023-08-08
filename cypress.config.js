const { defineConfig } = require('cypress');
const { readPdf } = require('./cypress/support/readPdf');

module.exports = defineConfig({
  // Other configurations...
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readPdf,
      });
    },
  },
});