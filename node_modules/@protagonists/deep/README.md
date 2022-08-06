<div id="top" align="center">

<h1><a href="https://github.com/ThePywon/deep">deep</a></h1>
 
[![npm version](https://img.shields.io/npm/v/@protagonists/deep)](https://npmjs.com/package/@protagonists/deep)
[![npm downloads](https://img.shields.io/npm/dt/@protagonists/deep)](https://npmjs.com/package/@protagonists/deep)
[![discord server](https://img.shields.io/discord/937758194736955443?logo=discord&logoColor=white)](https://discord.gg/cwhj3EgqGP)
[![last commit](https://img.shields.io/github/last-commit/ThePywon/deep)](https://github.com/ThePywon/deep)
 
</div>



# About

A package used to clone and freeze object in more than just a superficial level

---

<br/><br/><br/>



# Table of content

* [**How to use?**](#how-to-use)

> The content below does not correspond to the object structure of the objects

* [**deepClone**](https://github.com/ThePywon/deep/blob/main/documentation/deepClone.md) &nbsp; ![Exported](https://img.shields.io/badge/-Exported-cyan)

* [**deepFreeze**](https://github.com/ThePywon/deep/blob/main/documentation/deepFreeze.md) &nbsp; ![Exported](https://img.shields.io/badge/-Exported-cyan)

---

<br/><br/><br/>



# How to use?

## Description

This package allows for cloning and freezing all the way, and even supports circular references!

## Import

### Terminal

> ```sh
> npm install @protagonists/deep
> ```

### Node.js

> ```js
> const { deepClone, deepFreeze } = require("@protagonists/deep");
> ```

---



<br/>

## Example

### Code:

```js
// Imports
const { deepClone } = require("@protagonists/deep");

// Create some object
const John = {
  name: "John",
  age: 37,
  friend: {
    name: "Steve",
    age: 35
  }
}

// Clone it
const clone = deepClone("John");
// Edit a value in the nested object
clone.friend.name = "Meep";

// Log them both
// this show that the nested object in the clone is not the same!
console.log(John);
console.log(clone);
```

<br/>

### Output:

```
{
  name: 'John',
  age: 37,
  friend: {
    name: 'Steve',
    age: 35
  }
}
{
  name: 'John',
  age: 37,
  friend: {
    name: 'Meep',
    age: 35
  }
}
```

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
