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

* [**Schema**](#schema)

* <details open><summary><a href="#properties"><b>Properties</b></a></summary>
  <p>

  * [**`isDefault`**](#isdefault) &nbsp; ![NEW](https://shields.io/badge/-New-red)
    
  </p>
</details>

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>

  * [**`[Symbol.hasInstance]`**](#hasinstance)
    
  </p>
</details>

---

<br/><br/><br/>



# Schema

A builder function that returns a [`Parser`](https://github.com/ThePywon/coerce/blob/main/documentation/Parser.md) that can coerce objects into following the passed model

<br/>

**Syntax:** &nbsp; `new Schema(obj)`

> Although a function, it must be used as a constructor  
> The lack of the keyword `new` causes an error

|**Parameters**|**Types**|
|-|-|
|`obj`|[**Object**](https://javascript.info/object)|

<br/>

**Returns:** &nbsp; [**Parser**](https://github.com/ThePywon/coerce/blob/main/documentation/Parser.md)

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
console.log(Person);
```

**Ouput:**

```
[Function: SchemaInstance] {
  raw: {
    name: StringType {},
    age: IntRange {},
    birthday: DateType {},
    friends: [ StringType {} ]
  },
  defaults: [Getter],
  setDefaults: [Function: setDefaults]
}
```

---

<br/><br/><br/>


# Properties

<br/>

<a id="isdefault"></a>

## `.isDefault` &nbsp; ![NEW](https://shields.io/badge/-New-red)

A Symbol used as a property name by the result of a convertion  
It has the same structure as the model but each property is a boolean  
`true` means the value we got from parsing is a default value defined before  
`false` means that the user has input the value (even if that value is the same as the corresponding default value)

**Type:** &nbsp; [**Symbol**](https://javascript.info/symbol)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema } = require("@protagonists/coerce");

// Log property
console.log(Schema.isDefault);
```

**Output:**

```
Symbol(isDefault)
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
  favColor: String,
  birthday: Date,
  friends: [String]
});

// Set default values
Person.setDefaults({
  name: "John",
  favColor: "Red",
  friends: ["Meep"]
});

// Create new Person
const John = Person({
  name: "John",
  age: 37,
  birthday: "1984"
});

// Log results
console.log(John);
console.log(John[Schema.isDefault]);
```

**Output:**

```{
  name: 'John',
  age: 37,
  favColor: 'Red',
  birthday: 1984-01-01T00:00:00.000Z,
  friends: [ 'Meep' ]
}
{
  name: false,
  age: false,
  favColor: true,
  birthday: false,
  friends: true
}

```


# Methods

<br/>

<a id="hasinstance"></a>

## `[Symbol.hasInstance]`

This is the function called when [`Schema`](#schema) is used in the right hand side of [`instanceof`](https://javascript.info/instanceof)  
It returns true if the value is itself or one of the temporary functions it created

<br/>

**Syntax:** &nbsp; `[Symbol.hasInstance]()`

<br/>

**Returns:** &nbsp; [**Boolean**](https://javascript.info/types#boolean-logical-type)

<br/>

### **Example**

**Code:**

```js
// Imports
const { Schema, SchemaTypes } = require("@protagonists/coerce");

// Create a model for the schema
const PersonModel = {
  name: String,
  age: SchemaTypes.IntRange(0, Number.MAX_SAFE_INTEGER),
  birthday: Date,
  friends: [String]
};
// Create schema 'Person' from model
const Person = new Schema(PersonModel);

// Log results
console.log(PersonModel instanceof Schema);
console.log(Person instanceof Schema);
console.log(Schema instanceof Schema);
```

**Output:**

```
false
true
true
```

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
