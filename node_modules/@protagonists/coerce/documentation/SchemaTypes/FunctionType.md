<div id="top" align="center">

<h1><a href="https://github.com/ThePywon/coerce">coerce</a><h1>

[![npm version](https://img.shields.io/npm/v/@protagonists/coerce)](https://github.com/ThePywon/coerce)
[![npm downloads](https://img.shields.io/npm/dt/@protagonists/coerce)](https://github.com/ThePywon/coerce)
[![discord server](https://img.shields.io/discord/937758194736955443?logo=discord&logoColor=white)](https://discord.gg/cwhj3EgqGP)
[![last commit](https://img.shields.io/github/last-commit/ThePywon/coerce)](https://github.com/ThePywon/coerce)

</div>


# About

A package to handle user inputs automatically

---

<br/><br/><br/>

# Table of content

* [**FunctionType**](#functiontype)

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>

  * [**`.call`**](#call)
  * [**`.toString`**](#tostring) &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)
    
  </p>
</details>

---

<br/><br/><br/>



# FunctionType

A class extending from [`SchemaType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaType.md)  
It only accepts [`Function`](https://javascript.info/function-basics)s

<br/>

**Syntax:** &nbsp; `new FunctionType()`

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.FunctionType();

// Log result of call()
console.log(validator.call( () => {} ));
```

**Output:**

```
[Function (anonymous)]
```

<br/>

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.FunctionType();

// Create a random function
function test() {
  // Some code
}

// Log result of call()
console.log(validator.call(test));
```

**Output:**

```
[Function: test]
```

<br/>

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.FunctionType();

// Create a random class
class test {}

// Log result of call()
console.log(validator.call(test));
```

**Output:**

```
undefined
```

<br/>

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create Schema 'Event'
const Event = new Schema({
  name: String,
  data: SchemaTypes.Any,
  callback: Function // Equivalent to SchemaTypes.FunctionType after model is created
});

// Coerce object with schema
const readyEvent = Event({
  name: "ready",
  data: {},
  callback: () => { console.log("Event called!") }
});

// Log result
console.log(readyEvent);
```

**Ouput:**

```
{
  name: 'ready',
  data: {},
  callback: [Function (anonymous)]
}
```

---

<br/><br/><br/>

# Methods

<br/>

## `.call`

The function called to validate any value into a [`Function`](https://javascript.info/function-basics)

<br/>

**Syntax:** &nbsp; `.call(val)`

|**Parameters**|**Types**|
|-|-|
|`val`|**Any**|

<br/>

**Returns:** &nbsp; [**Function**](https://javascript.info/function-basics)

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.FunctionType();

// Log result of call()
console.log(validator.call( function() {} ));
```

**Output:**

```
[Function (anonymous)]
```

<br/><br/>

<a id="tostring"></a>

## `.toString` &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)

A function used to convert this object into a string format

<br/>

**Syntax:** &nbsp; `.toString()`

<br/>

**Returns:** &nbsp; [**String**](https://javascript.info/string)

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Log SchemaType instance's toString() result
console.log(new SchemaTypes.FunctionType().toString());
```

**Output:**

```
Function
```

---

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
