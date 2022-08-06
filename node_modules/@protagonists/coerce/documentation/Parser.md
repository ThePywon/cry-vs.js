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

* [**Parser**](#parser)

* <details open><summary><a href="#properties"><b>Properties</b></a></summary>
  <p>

  * [**`raw`**](#raw)
  * [**`defaults`**](#defaults)
    
  </p>
</details>

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>

  * [**`setDefaults`**](#setdefaults)
  * [**`toString`**](#tostring) &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)
    
  </p>
</details>

---

<br/><br/><br/>


# Parser

A resulting function from [`Schema`](https://github.com/ThePywon/coerce/blob/main/documentation/Schema.md) used to parse an object by following a model

<br/>

**Syntax:** &nbsp; `Parser(val)`

|**Parameters**|**Types**|
|-|-|
|`val`|[**Object**](https://javascript.info/object)|

<br/>

**Returns:** &nbsp; [**Object**](https://javascript.info/object)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create schema 'Person'
const Person = new Schema({
  name: String,
  age: SchemaTypes.IntRange(0, 200),
  birthday: Date,
  friends: [String]
});

// Log the Person schema's raw model
console.log(Person.raw);

// Coerce object with schema
const John = new Person({
  name: "John",
  favColor: "Red",
  friends: ["Steve", "Carla", "Meep"],
  kids: 2,
  birthday: "1984",
  age: 37
});

// Log result
console.log(John);
```

**Output:**

```
{
  name: StringType {},
  age: IntRange {},
  birthday: DateType {},
  friends: [ StringType {} ]
}
{
  name: 'John',
  age: 37,
  birthday: 1984-01-01T00:00:00.000Z,
  friends: [ 'Steve', 'Carla', 'Meep' ]
}
```

---

<br/><br/><br/>



# Properties

<br/>

## `.raw`

The raw parsed model used to coerce the objects

**Type:** &nbsp; [**Object**](https://javascript.info/object)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create schema 'Person'
const Person = new Schema({
  name: String,
  age: SchemaTypes.IntRange(0, 200),
  birthday: Date,
  friends: [String]
});

// Log result
console.log(Person.raw);
```

**Output:**

```
{
  name: StringType {},
  age: IntRange {},
  birthday: DateType {},
  friends: [ StringType {} ]
}
```

<br/><br/>

## `.defaults`

An object in the same format as the model containing all the placeholder values used when ceorcing objects

**Type:** [**Object**](https://javascript.info/object)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create schema 'Person'
const Person = new Schema({
  name: String,
  age: SchemaTypes.IntRange(0, 200),
  birthday: Date,
  friends: [String]
});
// Set the schema's default values
Person.setDefaults({
  birthday: "1900"
});

// Log the schema's default values
console.log(Person.defaults);
```

**Output:**

```
{
  name: undefined,
  age: undefined,
  birthday: 1900-01-01T00:00:00.000Z,
  friends: []
}
```

---

<br/><br/><br/>



# Methods

<br/>

## `.setDefaults`

A function used to set the properties of [`.defaults`](#defaults)

<br/>

**Syntax:** &nbsp; `.setDefaults(val)`

|**Parameters**|**Types**|
|-|-|
|`val`|[**Object**](https://javascript.info/object)|

<br/>

**Returns:** &nbsp; [**Void**](https://javascript.info/types#the-undefined-value)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create schema 'Person'
const Person = new Schema({
  name: String,
  age: SchemaTypes.IntRange(0, 200),
  birthday: Date,
  friends: [String]
});
// Set schema's default values
Person.setDefaults({
  friends: ["Steve"],
  birthday: "1900",
  favColor: "Red"
});

// Log schema's default values
console.log(Person.defaults);
```

**Output:**

```
{
  name: undefined,
  age: undefined,
  birthday: 1900-01-01T00:00:00.000Z,
  friends: [ 'Steve' ]
}
```


<br/><br/>


## `.toString` &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)

A function used to convert this object into a string format  
It returns a stringified version of [`.raw`](#raw)

<br/>

**Syntax:** &nbsp; `.toString()`

<br/>

**Returns:** &nbsp; [**String**](https://javascript.info/string)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create schema 'Person'
const Person = new Schema({
  name: String,
  age: SchemaTypes.IntRange(0, Number.MAX_SAFE_INTEGER),
  birthday: Date,
  friends: [String]
});

// Log toString
console.log(Person.toString());
```

**Output:**

```
{
  name: StringType {},
  age: IntRange {},
  birthday: DateType {},
  friends: [ StringType {} ]
}
```


<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
