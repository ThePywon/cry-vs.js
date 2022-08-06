"use strict";

// Import
const SchemaType = require("../SchemaType");
const util = require("util");

// Create _Function_ class
class FunctionType extends SchemaType {
  // Initialization
  constructor() { super() }

  // Conversion
  call(val) {
    if(typeof val === "function") {
      if(!util.inspect((val.prototype||val)
         .constructor).startsWith("[class"))
        return val;
    }
  }
}
// Simple toString function override
FunctionType.prototype.toString = function toString() { return "Function" }

// Export
module.exports = FunctionType;
