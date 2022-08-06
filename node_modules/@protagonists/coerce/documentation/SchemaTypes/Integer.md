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

* [**Integer**](#integer)

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>

  * [**`.call`**](#call)
  * [**`.toString`**](#tostring) &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)
    
  </p>
</details>

---

<br/><br/><br/>



# Integer

A class extending from [`SchemaType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaType.md)  
It accepts all valid [`Number`](https://javascript.info/number)  
It tries to convert anything else into one and removes any floating point

<br/>

**Syntax:** &nbsp; `new Integer()`

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.Integer();

// Log result of call()
console.log(validator.call(12));
```

**Output:**

```
12
```

<br/>

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.Integer();

// Log result of call()
console.log(validator.call(35.75));
```

**Output:**

```
35
```

<br/>

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.Integer();

// Log result of call()
console.log(validator.call("69 haha funny number"));
```

**Output:**

```
69
```

<br/>

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.Integer();

// Log result of call()
console.log(validator.call({ "This is": "an object" }));
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

// Create schema 'Person'
const Person = new Schema({
  name: String,
  age: SchemaTypes.Integer,
  birthday: Date,
  friends: [String]
});

// Coerce object with schema
const John = Person({
  name: "John",
  age: 37.5,
  birthday: "1984",
  friends: [ "Steve", "Carl", "Meep" ]
});

// Log result of call()
console.log(John);
```

**Ouput:**

```
{
  name: 'John',
  age: 37,
  birthday: 1984-01-01T00:00:00.000Z,
  friends: [ 'Steve', 'Carla', 'Meep' ]
}
```

---

<br/><br/><br/>

# Methods

<br/>

## `.call`

The function called to convert and/or validate a value to [`Number`](https://javascript.info/number) with no floating point

<br/>

**Syntax:** &nbsp; `.call(val)`

|**Parameters**|**Types**|
|-|-|
|`val`|**Any**|

<br/>

**Returns:** &nbsp; [**Number**](https://javascript.info/number)

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new SchemaTypes.Integer();

// Log result of call()
console.log(validator.call(-34.235));
```

**Output:**

```
-34
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
console.log(new SchemaTypes.Integer().toString());
```

**Output:**

```
Integer
```

---

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
