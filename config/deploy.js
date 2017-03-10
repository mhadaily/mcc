/* jshint node: true */

var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'dev',
  'canary',
  'prod'
];

module.exports = function (deployTarget) {

  var ENV = {
    build: {},
    redis: {
      allowOverwrite: true,
      keyPrefix: 'coaches:index'
    },
    s3: {
      prefix: 'coaches'
    }
  };
  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://0.0.0.0:6379/';
    ENV.plugins = ['build', 'redis']; // only care about deploying index.html into redis in dev
  }

  if (deployTarget === 'canary' || deployTarget === 'prod') {
    ENV.build.environment = 'production';
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = 'mobe-assets'/* YOUR S3 BUCKET NAME */;
    ENV.s3.region = 'us-east-1'/* YOUR S3 REGION */;
  }

  if (deployTarget === 'canary') {
    ENV.build.environment = 'canary';
    ENV.redis.url = process.env.QA_REDIS_URL;
    ENV.redis.keyPrefix = 'canary-coaches:index';
    ENV.s3.prefix = 'canary-coaches';
  }

  if (deployTarget === 'prod') {
    ENV.redis.url = process.env.PROD_REDIS_URL;
  }

  // return ENV;

  var Promise = require('ember-cli/lib/ext/promise');
  return new Promise(function (resolve, reject) {
    var exec = require('child_process').exec;
    var command = 'heroku config:get REDIS_URL --app mobecentral';
    exec(command, function (error, stdout, stderr) {
      ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/h:/, '//:');
      if (error) {
        reject(error);
      } else {
        resolve(ENV);
      }
    });
  });

  /* Note: a synchronous return is shown above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
}
