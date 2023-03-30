'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: ['AUTH0_DOMAIN', 'AUTH0_CLIENT_ID'],
    },
    sassOptions: {
      includePaths: ['node_modules/bootstrap/scss'],
    },
  });
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  return app.toTree();
};
