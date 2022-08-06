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



# deepClone

This function clones an object in a recursive way whilst handling circular references

<br/>

**Syntax:** &nbsp; `deepClone(obj)`

|**Parameters**|**Types**|
|-|-|
|`obj`|[**Object**](https://javascript.info/object)|

<br/>

**Returns:** &nbsp; [**Object**](https://javascript.info/object)

<br/>

### **Examples**

**Code:**

```js
// Imports
const { deepClone } = require("@protagonists/deep");

// Create some object
const obj = {
  "a": "a",
  "b": "b",
  "c": {
    "d": "d"
  }
}

// Clone it
const clone = deepClone(obj);
// Modify some properties
clone.b = "c";
clone.c.d = "a";

// Log the result
console.log(obj);
console.log(clone);
```

**Output:**

```
{
  a: 'a',
  b: 'b',
  c: {
    'd': 'd'
  }
}
{
  a: 'a',
  b: 'c',
  c: {
    'd': 'a'
  }
}
```

<br/>

**Code:**

```js
// Imports
const { deepClone } = require("@protagonists/deep");

// Create objects with circular reference
const a = { name: "a" };
const b = { name: "b", friend: a };
a.friend = b;

// Clone object
const c = deepClone(a);
// Modify some properties
c.name = "c";
c.friend.name = "d";

// Log the result
console.log(a);
console.log(c);
```

**Output:**

```
<ref *1> {
  name: 'a',
  friend: { name: 'b', friend: [Circular *1] }
}
<ref *1> {
  name: 'c',
  friend: { name: 'd', friend: [Circular *1] }
}
```

---



<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
