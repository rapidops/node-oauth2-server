
/**
 * Module dependencies.
 */

var InvalidArgumentError = require('./errors/invalid-argument-error');
var typeis = require('type-is');

/**
 * Constructor.
 */

function Request(options) {
  options = options || {};

  if (!options.headers) {
    throw new InvalidArgumentError('Missing parameter: `headers`');
  }

  if (!options.method) {
    throw new InvalidArgumentError('Missing parameter: `method`');
  }

  if (!options.query) {
    throw new InvalidArgumentError('Missing parameter: `query`');
  }

  this.body = options.query || {};
  this.headers = {};
  this.method = options.method;
  this.query = options.query;

  // Store the headers in lower case.
  for (var field in options.headers) {
    this.headers[field.toLowerCase()] = options.headers[field];
  }
}

/**
 * Get a request header.
 */

Request.prototype.get = function(field) {
  return this.headers[field.toLowerCase()];
};

/**
 * Check if the content-type matches any of the given mime type.
 */

Request.prototype.is = function(types) {
  if (!Array.isArray(types)) {
    types = [].slice.call(arguments);
  }

  return typeis(this, types) || false;
};

/**
 * Export constructor.
 */

module.exports = Request;
