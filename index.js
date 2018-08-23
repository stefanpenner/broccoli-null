'use strict';

var Plugin = require('broccoli-plugin');
var BROCCOLI_NULL_VERSION = '_1_';

module.exports = Null;

function getGlobal() {
  return process['BROCCOLI_NULL_VERSION' + BROCCOLI_NULL_VERSION];
}

function setGlobal(tree) {
  process['BROCCOLI_NULL_VERSION' + BROCCOLI_NULL_VERSION] = tree;
}

function Null() {
  let NULL = getGlobal();
  if (this.constructor.isNull(NULL)) {
    return NULL;
  }

  Plugin.call(this, [], {
    annotation: 'Null',
    persistentOutput: false,
    needsCache: false
  });

  setGlobal(this);
}

Null.prototype = Object.create(Plugin.prototype);
Null.prototype.constructor = Null;
Null.prototype.build = function() {};

Null.isNull = function(maybe) {
  return maybe !== null &&
    typeof maybe === 'object' &&
    maybe.BROCCOLI_NULL_VERSION === BROCCOLI_NULL_VERSION;
};

Null.prototype.BROCCOLI_NULL_VERSION = BROCCOLI_NULL_VERSION;
Object.defineProperty(Null, 'NULL', {
  get: function() {
    return getGlobal();
  }
});
