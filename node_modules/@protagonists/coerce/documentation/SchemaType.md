<div id="top" align="center">

<h1><a href="https://github.com/ThePywon/coerce">coerce</a></h1>
 
[![npm version](https://img.shields.io/npm/v/@protagonists/coerce)](https://npmjs.com/package/@protagonists/coerce)
[![npm downloads](https://img.shields.io/npm/dt/@protagonists/coerce)](https://npmjs.com/package/@protagonists/coerce)
[![discord server](https://img.shields.io/discord/937758194736955443?logo=discord&logoColor=white)](https://discord.gg/cwhj3EgqGP)
[![last commit](https://img.shields.io/github/last-commit/ThePywon/coerce)](https://github.com/ThePywon/coerce)
 
</div>


# About

A package to handle user inputs automatically

---

<br/><br/><br/>

# Table of content

* [**SchemaType**](#schematype)

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>

  * [**`defaultCheck`**](#defaultcheck) &nbsp; [![Static](https://img.shields.io/badge/-Static-red)](https://javascript.info/static-properties-methods)
  * [**`call`**](#call)
  * [**`toString`**](#tostring) &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)
    
  </p>
</details>

---

<br/><br/><br/>



# SchemaType

The class used to parse each values within a model  
This class is meant to be extended upon

<br/>

**Syntax:** &nbsp; `new SchemaType()`

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaType, SchemaTypes } = require("@protagonists/coerce");


// Create class 'Gender' from SchemaType class
class Gender extends SchemaType {
  // Static values used for Gender
  static Male = Symbol("Male");
  static Female = Symbol("Female");

  // Call parent constructor
  constructor() { super() }

  // Parse/validate values
  call(val) {
    if(val === Gender.Male ||
      val === Gender.Female)
      return val;
  }
}

// Create schema "Person"
const Person = new Schema({
  name: String,
  gender: Gender,
  age: SchemaTypes.IntRange(0, Number.MAX_SAFE_INTEGER),
  birthday: Date,
  friends: [String]
});

// Coerce object with schema
const John = Person({
  name: "John",
  gender: Gender.Male,
  age: 37,
  birthday: "1984",
  friends: ["Steve", "Carl", "Meep"]
});

// Log result
console.log(John);
```

**Output:**

```
{
  name: 'John',
  gender: Symbol(Male),
  age: 37,
  birthday: 1984-01-01T00:00:00.000Z,
  friends: [ 'Steve', 'Carl', 'Meep' ]
}
```

---

<br/><br/><br/>

# Methods

<br/>

<a id="defaultcheck"></a>

## `.defaultCheck` &nbsp; [![Static](https://img.shields.io/badge/-Static-red)](https://javascript.info/static-properties-methods)

A simple function that returns true if a value is a valid value  
It returns false whenever the value is [`undefined`](https://javascript.info/types#the-undefined-value), [`null`](https://javascript.info/types#the-null-value) or [`NaN`](https://javascript.info/number#tests-isfinite-and-isnan)

<br/>

**Syntax:** &nbsp; `.defaultCheck(val)`

|**Parameters**|**Types**|
|-|-|
|`val`|**Any**|

<br/>

**Returns:** &nbsp; [**Boolean**](https://javascript.info/types#boolean-logical-type)

<br/>

### **Example**

**Code:**

```js
// Import
const { Schema, SchemaType, SchemaTypes } = require("@protagonists/coerce");

// Create class 'Gender' from SchemaType class
class Gender extends SchemaType {
  // Static values used for Gender
  static Male = Symbol("Male");
  static Female = Symbol("Female");

  // Call parent constructor
  constructor() { super() }

  // Parse/validate values
  call(val) {
    if(!SchemaType.defaultCheck(val)) return;

    if(val === Gender.Male ||
      val === Gender.Female)
      return val;
  }
}

// Create schema 'Person'
const Person = new Schema({
  name: String,
  gender: Gender,
  age: SchemaTypes.IntRange(0, Number.MAX_SAFE_INTEGER),
  birthday: Date,
  friends: [String]
});

// Coerce object with schema
const John = Person({
  name: "John",
  gender: Gender.Male,
  age: 37,
  birthday: "1984",
  friends: ["Steve", "Carl", "Meep"]
});

// Log result
console.log(John);
```

**Output:**

```
{
  name: 'John',
  gender: Symbol(Male),
  age: 37,
  birthday: 1984-01-01T00:00:00.000Z,
  friends: [ 'Steve', 'Carl', 'Meep' ]
}
```

<br/><br/>

## `.call`

The function called to convert a value into the proper type and/or validate a value

<br/>

**Syntax:** &nbsp; `.call(val)`

|**Parameters**|**Types**|
|-|-|
|`val`|**Any**|

<br/>

**Returns:** &nbsp; **Any**

<br/>

### **Example**

**Code:**

```js
const { Schema, SchemaType } = require("@protagonists/coerce");

console.log(new SchemaType().call("A random value"));
```

**Output:**

```
A random value
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
const { SchemaType } = require("@protagonists/coerce");

// Create class 'Gender' from SchemaType class
class Gender extends SchemaType {
  // Static values used for Gender
  static Male = Symbol("Male");
  static Female = Symbol("Female");

  // Call parent constructor
  constructor() { super() }

  // Parse/validate values
  call(val) {
    if(val === Gender.Male ||
      val === Gender.Female)
      return val;
  }
}

// Log result
console.log(new Gender().toString());
```

**Output:**

```
[SchemaType Gender]
```

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>

<div id="top" align="center">
