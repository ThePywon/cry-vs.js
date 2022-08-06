"use strict";

// Import
const NumberSymbol = require("./NumberType");

// Integer class definition
class Integer extends NumberSymbol {
  // Initialization
  constructor() { super() }

  // Conversion
  call(val) {
    val = super.call(val);

    if(val === undefined) return;
      
    return Number.isInteger(val) ? val : parseInt(val);
  }
}
// Simple toString function override
Integer.prototype.toString = function toString() { return "Integer" }

// Export
module.exports = Integer;
