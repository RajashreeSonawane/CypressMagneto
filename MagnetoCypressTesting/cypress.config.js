const { defineConfig } = require("cypress");
module.exports = defineConfig({
  chromeWebSecurity: false,
  "env":
  {
    "url": "https://magento.softwaretestingboard.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})






