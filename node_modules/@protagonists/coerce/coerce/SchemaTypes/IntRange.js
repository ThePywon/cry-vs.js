"use strict";

// Import
const Integer = require("./Integer");
const validator = new Integer();

/**
 * @param {number} min
 * @param {number} max
 * @returns {typeof Integer}
 */
function IntRange(min, max) {
  // Parse parameters
  min = validator.call(min);
  max = validator.call(max);

  // Validate parameters
  if(min === undefined)
    throw new Error("Invalid passed value for parameter 'min', expected Integer.");
  if(max === undefined)
    throw new Error("Invalid passed value for parameter 'max', expected Integer.");
  if(min > max)
    throw new Error("Invalid passed value for parameter 'min', must not be higher than parameter 'max'");

  // Create temp class
  const result = class IntRangeInstance extends Integer {
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
  result.prototype.toString = function toString() { return `IntRange(${min}, ${max})` }

  // Return temp class
  return result;
}

module.exports = IntRange;
