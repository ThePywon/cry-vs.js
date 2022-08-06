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



# IntRange

A function that return a class extending from [`Integer`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/Integer.md)  
The returned class accepts and converts all values [`Integer`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/Integer.md) can parse that are within a defined range (inclusive)

<br/>

**Syntax:** &nbsp; `IntRange(min, max)`

|**Parameters**|**Types**|
|-|-|
|`min`|Any|
|`max`|Any|

> Accepted values are all the values [`Integer`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/Integer.md) can parse  
> `min` must be equal or smaller than `max`

<br/>

**Returns:** &nbsp; [**IntRangeInstance**](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/IntRangeInstance.md)

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.IntRange(0, 5));

// Log result of call()
console.log(validator.call(1234567890));
```

**Output:**

```
undefined
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.IntRange(0, 5));

// Log result of call()
console.log(validator.call(4));
```

**Output:**

```
4
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.IntRange(0, 5));

// Log result of call()
console.log(validator.call("5 is within the range yes"));
```

**Output:**

```
5
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.IntRange(0, 5));

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
  age: SchemaTypes.IntRange(0, 200),
  birthday: Date,
  friends: [String]
});

// Coerce object with schema
const John = Person({
  name: "John",
  age: 37,
  birthday: "1984",
  friends: [ "Steve", "Carl", "Meep" ]
});

// Log result
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

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
