"use strict";

// Import
const SchemaType = require("../SchemaType");

// _String_ class definition
class StringType extends SchemaType {
  // Initialization
  constructor() { super() }

  // Conversion
  call(val) {
    if(SchemaType.defaultCheck(val) && typeof val.toString === "function") {
      const str = val.toString();
      if(typeof str === "string") return str;
    }
  }
}
// Simple toString function override
StringType.prototype.toString = function toString() { return "String" }

// Export
module.exports = StringType;
