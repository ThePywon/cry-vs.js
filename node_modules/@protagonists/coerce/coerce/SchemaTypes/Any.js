"use strict";

const SchemaType = require("../SchemaType");

class Any extends SchemaType {
  // Initialization
  constructor() { super() }
}
// Simple toString function override
Any.prototype.toString = function toString() { return "Any" }

// Export
module.exports = Any;
