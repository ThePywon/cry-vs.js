"use strict";

const IntRange = require("./IntRange");

const Byte = IntRange(0, 255);
Byte.prototype.toString = function toString() { return "Byte" }

module.exports = Byte;
