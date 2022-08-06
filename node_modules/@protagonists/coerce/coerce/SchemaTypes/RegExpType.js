"use strict";

// Import
const StringType = require("./StringType");

// _RegExp_ class definition
class RegExpType extends StringType {
  // Initialization
  constructor() { super() }

  // Conversion
  call(val) {
    if(val instanceof RegExp) return val;

    val = super.call(val);

    if(val === undefined) return;

    try {
      const regexp = new RegExp(val);
      if(regexp.toString() === "/(?:)/" &&
         val != "(?:)")
        return;
      return regexp;
    } catch(e) {}
  }
}
// Simple toString function override
RegExpType.prototype.toString = function toString() { return "RegExp" }

// Export
module.exports = RegExpType;
