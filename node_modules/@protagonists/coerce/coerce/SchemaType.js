"use strict";

// Imports
const util = require("util");

// SchemaType class definition
class SchemaType {

  // Initialization
  constructor() {
    // Throw error if 'call' is not a function
    if(typeof this.call !== "function" || util.inspect((this.call.prototype||this.call)
    .constructor).startsWith("[class"))
      throw new Error("Invalid value at property 'call', expected function");
  }

  /**
   * Returns false is the value is undefined, null or NaN
   * @param {any} val 
   * @returns {boolean}
   */
  static defaultCheck(val) {
    if(val === undefined ||
      val === null ||
      typeof val === "number" && isNaN(val))
      return false;
    return true;
  }

  // The function where the conversion magic happens
  /**
   * Parses and validates the passed value into the correct format
   * @param {any} val 
   * @returns {any}
   */
  call(val) {
    if(SchemaType.defaultCheck(val)) return val;
  }
}
// Default toString function
SchemaType.prototype.toString = function toString() {
  return `[SchemaType ${this.constructor.name}]`;
}

// Export
module.exports = Object.freeze(SchemaType);
