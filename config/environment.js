/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    moment: {
      includeTimezone: 'all',
      outputFormat: 'MM/DD/YYYY',
      allowEmpty: true, // default: false
    },
    modulePrefix: 'mobecallcentre',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiHost = process.env.API_HOST || 'mobecentral.dev';
    ENV.apiPort = process.env.API_PORT ? ':' + process.env.API_PORT : '';
    ENV.apiUrl = process.env.API_URL || `http://${ENV.apiHost}${ENV.apiPort}`;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.apiHost = process.env.API_HOST || 'mobecentral.herokuapp.com';
  ENV.apiPort = process.env.API_PORT ? ':' + process.env.API_PORT : '';
  ENV.apiUrl = process.env.API_URL || `https://${ENV.apiHost}${ENV.apiPort}`;

  return ENV;
};
