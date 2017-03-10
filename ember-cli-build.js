/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var env = EmberApp.env() || 'development';

  var fingerprintOptions = {
    enabled: true,
  };

  switch (env) {
    case 'development':
      fingerprintOptions.prepend = 'http://localhost:4200/';
      break;
    case 'production':
      fingerprintOptions.prepend = '//s3.amazonaws.com/mobe-assets/coaches/';
      break;
    case 'canary':
      fingerprintOptions.prepend = '//s3.amazonaws.com/mobe-assets/canary-coaches/';
      break;

  }

  var app = new EmberApp(defaults, {
    fingerprint: fingerprintOptions
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/js-cookie/src/js.cookie.js');
  app.import('bower_components/theme-dashboard/dist/toolkit.js');
  app.import('bower_components/theme-dashboard/fonts/toolkit-entypo.eot', {destDir: '/fonts'});
  app.import('bower_components/theme-dashboard/fonts/toolkit-entypo.ttf', {destDir: '/fonts'});
  app.import('bower_components/theme-dashboard/fonts/toolkit-entypo.woff', {destDir: '/fonts'});
  app.import('bower_components/theme-dashboard/fonts/toolkit-entypo.woff2', {destDir: '/fonts'});

  return app.toTree();
};
