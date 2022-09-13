module.exports = {
  //projectId: '7uzru6',
  projectId: "t728od",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },

    baseUrl: "https://react-redux.realworld.io",

    "viewportWidth": 1024,
    "viewportHeight": 1000

  },
}
