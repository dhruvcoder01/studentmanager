// Debug wrapper to capture all output
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  if (id === 'fs' || id === 'path' || id.includes('node_modules')) {
    console.log(`[LOADING MODULE] ${id}`);
  }
  return originalRequire.apply(this, arguments);
};

// Hook console methods
const originalLog = console.log;
const originalError = console.error;

console.log = function(...args) {
  console.error(`[LOG] ${new Error().stack.split('\n')[1]}`);
  originalLog.apply(console, args);
};

console.error = function(...args) {
  originalError.apply(console, args);
};

// Now load the app
require('./app.js');
