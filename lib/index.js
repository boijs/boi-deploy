const _ = require('lodash');
const Path = require('path');
const BoiUtils = require('boi-utils');

/**
 * @module boi/deploy
 * @param {string} dirname directory name of files that need to be deployed
 * @param {Object} options deployment configurations
 */
module.exports = function (dirname, options, appname) {
  if (!options || !_.isPlainObject(options) || _.isEmpty(options)) {
    BoiUtils.log.error('Invalid configuration for deployment');
    process.exit(1);
  }
  if (options.connect && options.connect.type !== 'sftp') {
    BoiUtils.log.error('Unsupportted connention protocol');
    process.exit(1);
  }
  const Dirname = Path.resolve(process.cwd(), dirname);
  const Appname = appname || 'app';
  /**
   * @todo more protocol support
   */
  switch (options.connect.type) {
    case 'sftp':
      require('./_sftp.js')(options.connect.config, Dirname, Appname);
      break;
    default:
      break;
  }
};