/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function () {
  return {
    clientAllowedKeys: ['DOMAIN', 'CLIENT_ID'],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};
