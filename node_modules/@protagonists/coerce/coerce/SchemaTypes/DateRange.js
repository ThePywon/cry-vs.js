"use strict";

// Import
const DateType = require("./DateType");
const validator = new DateType();

/**
 * @typedef {Date|string|number} date
 */

/**
 * @param {date} min
 * @param {date} max
 * @returns {typeof DateType}
 */
function DateRange(min, max) {
  // Parse parameters
  min = validator.call(min);
  max = validator.call(max);

  // Validate parameters
  if(min === undefined)
    throw new Error("Invalid passed value for parameter 'min', expected Date.");
  if(max === undefined)
    throw new Error("Invalid passed value for parameter 'max', expected Date.");
  if(min > max)
    throw new Error("Invalid passed value for parameter 'min', must not be higher than parameter 'max'");

  // Create temp class
  const result = class DateRangeInstance extends DateType {
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
  result.prototype.toString = function toString() { return `DateRange(${min.getTime()}, ${max.getTime()})` }

  // Return temp class
  return result;
}

module.exports = DateRange;
