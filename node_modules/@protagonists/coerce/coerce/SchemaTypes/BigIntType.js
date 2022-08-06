"use strict";

// Import
const Integer = require("./Integer");

// _BigInt_ class definition
class BigIntType extends Integer {
  // Initialization
  constructor() { super() }

  // Conversion
  call(val) {
    if(val instanceof BigInt)
      return val;
      
    val = super.call(val);

    if(val === undefined) return;
      
    return BigInt(val);
  }
}
// Simple toString function override
BigIntType.prototype.toString = function toString() { return "BigInt" }

// Export
module.exports = BigIntType;
