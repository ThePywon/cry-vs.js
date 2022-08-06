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



# BigIntRange

A function that return a class extending from [`BigIntType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/BigIntType.md)  
The returned class accepts and converts all values [`BigIntType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/BigIntType.md) can parse that are within a defined range (inclusive)

<br/>

**Syntax:** &nbsp; `BigIntRange(min, max)`

|**Parameters**|**Types**|
|-|-|
|`min`|Any|
|`max`|Any|

> Accepted values are all the values [`BigIntType`](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/BigIntType.md) can parse  
> `min` must be equal or smaller than `max`

<br/>

**Returns:** &nbsp; [**BigIntRangeInstance**](https://github.com/ThePywon/coerce/blob/main/documentation/SchemaTypes/BigIntRangeInstance.md)

<br/>

### **Example**

**Code:**

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.BigIntRange(0, 5));

// Log result of call()
console.log(validator.call(123456789012345678901234567890n));
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
const validator = new (SchemaTypes.BigIntRange(0, 5));

// Log result of call()
console.log(validator.call(4));
```

**Output:**

```
4n
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.BigIntRange(0, 5));

// Log result of call()
console.log(validator.call("5 is within the range yes"));
```

**Output:**

```
5n
```

<br/>

```js
// Imports
const { SchemaTypes } = require("@protagonists/coerce");

// Create SchemaType instance
const validator = new (SchemaTypes.BigIntRange(0, 5));

// Log result of call()
console.log(validator.call({ "This is": "an object" }));
```

**Output:**

```
undefined
```

---

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
