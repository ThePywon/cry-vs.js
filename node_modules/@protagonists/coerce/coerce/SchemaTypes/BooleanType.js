"use strict";

// Import
const SchemaType = require("../SchemaType");

// _Boolean_ class definition
class BooleanType extends SchemaType {
  // Initialization
  constructor() { super() }

  // Conversion
  call(val) { return SchemaType.defaultCheck(val) ? !!val : undefined }
}
// Simple toString function override
BooleanType.prototype.toString = function toString() { return "Boolean" }

// Export
module.exports = BooleanType;
