"use strict";

function deepClone(obj, map = new WeakMap()) {
  // Solve simple use cases
  if(!obj || typeof obj !== "object")
    return obj;
  else if(obj instanceof Date)
    return new Date(obj.getTime());
  else if(obj instanceof Array)
    return Array.from(obj);

  // Solve circular references
  if(map.get(obj))
    return map.get(obj);

  const clone = {};
  map.set(obj, clone);
  
  // Loop through all properties
  const props = Object.getOwnPropertyNames(obj)
    .concat(Object.getOwnPropertySymbols(obj));
  for(let i = 0; i < props.length; i++)
    clone[props[i]] = deepClone(obj[props[i]], map);

  // Return the finished clone
  return clone;
}

module.exports = deepClone;
