"use strict";

function deepFreeze(obj) {
  // Stop here if not an object
  if(typeof obj !== "object")
    return obj;

  // Loop through all properties
  const props = Object.getOwnPropertyNames(obj)
    .concat(Object.getOwnPropertySymbols(obj));
  for(let i = 0; i < props.length; i++)
    if(typeof obj[props[i]] === "object")
      deepFreeze(obj[props[i]]);

  // Freeze the object
  Object.freeze(obj);
}

module.exports = deepFreeze;
