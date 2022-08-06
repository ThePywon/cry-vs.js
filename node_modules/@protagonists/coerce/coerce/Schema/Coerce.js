"use strict";

const SchemaType = require("../SchemaType");

const isDefault = Symbol("isDefault");

function iterate_STRICT(model, obj, defaults, path) {

  // Iterable is an Array
  if(Array.isArray(obj)) {
    const result = [];

    // Loop through each element of the object
    for(let i = 0; i < obj.length; i++) {
      let valid = false;

      // Loop through each element of the model
      for(let j = 0; j < model.length; j++) {
        const value = model[j].call(obj[i]);

        // Push the value onwards once one of the elements successfully parsed
        if(value !== undefined) {
          valid = true;
          result.push(value);
          break;
        }
      }

      // In case of failure
      if(!valid)
        throw new Error(`Invalid value at '${path}[${i}]'. Expected ${model.map(s => s.toString()).join(' OR ')}.`);
    }

    return result.length > 0 ? result : defaults;
  }
  // Iterable is an Object
  else {
    const result = {};
    Object.defineProperty(result, isDefault, {
      configurable: true,
      value: {},
      writable: true
    });
    const props = Object.getOwnPropertyNames(model);

    // Loop through model properties
    for(let i = 0; i < props.length; i++) {
      const name = props[i];
      const mprop = model[name];
      const oprop = obj[name];
      const dprop = defaults[name];

      // Parse each value
      if(mprop instanceof SchemaType) {
        const value = mprop.call(oprop);
        result[name] = value === undefined ? dprop : value;
        result[isDefault][name] = value === undefined;
      }
      else if(Array.isArray(mprop))
        if(Array.isArray(oprop)) {
          result[name] = iterate_STRICT(mprop, oprop, dprop, path + '.' + name);
          result[isDefault][name] = result[name] == dprop;
        }
        else {
          result[name] = iterate_STRICT(mprop, oprop === undefined ? [] : [oprop], dprop, path + '.' + name);
          result[isDefault][name] = result[name] == dprop;
        }
      else {
        const value = iterate_STRICT(mprop, oprop, dprop, path + '.' + name);
        result[isDefault][name] = value[isDefault];
        delete value[isDefault];
        result[name] = value;
      }

      // In case of failure
      if(result[name] === undefined)
        throw new Error(`Invalid value at '${path}.${name}'. Expected ${mprop.toString()}.`);
    }

    return result;
  }
}


function iterate(model, obj) {

  // Iterable is an Array
  if(Array.isArray(obj)) {
    const result = [];

    // Loop through each element of the object
    for(let i = 0; i < obj.length; i++) {

      // Loop through each element of the model
      for(let j = 0; j < model.length; j++) {
        const value = model[j].call(obj[i]);

        // Push the value onwards once one of the elements successfully parsed
        if(value !== undefined) {
          result.push(value);
          break;
        }
      }
    }

    return result;
  }
  // Iterable is an Object
  else {
    const result = {};
    const props = Object.getOwnPropertyNames(model);

    // Loop through model properties
    for(let i = 0; i < props.length; i++) {
      const name = props[i];
      const mprop = model[name];
      const oprop = obj[name];

      // Parse each value
      if(mprop instanceof SchemaType)
        result[name] = mprop.call(oprop);
      else if(Array.isArray(mprop))
        if(Array.isArray(oprop))
          result[name] = iterate(mprop, oprop);
        else result[name] = iterate(mprop, oprop === undefined ? [] : [oprop]);
      else result[name] = iterate(mprop, oprop === undefined ? {} : oprop);
    }

    return result;
  }
}


function Coerce(model, obj, defaults) { return defaults ? iterate_STRICT(model, obj, defaults, "root") : iterate(model, obj) }


module.exports = { Coerce, isDefault };
