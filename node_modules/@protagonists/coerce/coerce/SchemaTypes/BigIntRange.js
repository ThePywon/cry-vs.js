"use strict";

// Import
const BigIntType = require("./BigIntType");
const validator = new BigIntType();

/**
 * @param {bigint} min
 * @param {bigint} max
 * @returns {typeof BigIntType}
 */
function BigIntRange(min, max) {
  // Parse parameters
  min = validator.call(min);
  max = validator.call(max);

  // Validate parameters
  if(min === undefined)
    throw new Error("Invalid passed value for parameter 'min', expected BigInt.");
  if(max === undefined)
    throw new Error("Invalid passed value for parameter 'max', expected BigInt.");
  if(min > max)
    throw new Error("Invalid passed value for parameter 'min', must not be higher than parameter 'max'");

  // Create temp class
  const result = class BigIntRangeInstance extends BigIntType {
    // Initialization
    constructor() { super() }

    // Conversion
    call(val) {
      val = super.call(val);

      if(val === undefined) return;

      if(val >= min && val <= max)
        return val;
    }
  }
  result.prototype.toString = function toString() { return `BigIntRange(${min}, ${max})` }

  // Return temp class
  return result;
}

module.exports = BigIntRange;
