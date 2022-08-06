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



# DateRange

A function that return a class extending from [`DateType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/DateType.md)  
The returned class accepts and converts all values [`DateType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/DateType.md) can parse that are within a defined range (inclusive)

<br/>

**Syntax:** &nbsp; `DateRange(min, max)`

|**Parameters**|**Types**|
|-|-|
|`min`|Any|
|`max`|Any|

> Accepted values are all the values [`DateType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/DateType.md) can parse  
> `min` must be equal or smaller than `max`

<br/>

**Returns:** &nbsp; [**DateRangeInstance**](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/DateRangeInstance.md)

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.DateRange("1890", "2000"));

// Log result of call()
console.log(validator.call("1893"));
```

**Output:**

```
1893-01-01T00:00:00.000Z
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.DateRange("1890", "2000"));

// Log result of call()
console.log(validator.call(new Date("1899")));
```

**Output:**

```
1899-01-01T00:00:00.000Z
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.DateRange("1890", "2000"));

// Log result of call()
console.log(validator.call(new Date("2015")));
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
  birthday: SchemaTypes.DateRange("1900", new Date()),
  friends: [String]
});

// Coerce object with schema
const John = Person({
  name: "John",
  age: 37,
  birthday: "1984",
  friends: [ "Steve", "Carl", "Meep" ]
});

// Log resul
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
