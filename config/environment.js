/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    preloader: {
      removeDelay: false,
      loadedClass: false
    },
    moment: {
      includeTimezone: 'all',
      outputFormat: 'DD MMM YYYY hh:mm',
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
        Date: false
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-19542376-49'
        }
      },
    ]
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

  ENV.apiHost = process.env.API_HOST || 'coaches.mobe.com';
  ENV.apiPort = process.env.API_PORT ? ':' + process.env.API_PORT : '';
  ENV.httpVshttps = ENV.apiHost.includes('mobe.com') ? 'https:' : 'http:';
  ENV.apiUrl = process.env.API_URL || `${ENV.httpVshttps}//${ENV.apiHost}${ENV.apiPort}`;

  return ENV;
};
