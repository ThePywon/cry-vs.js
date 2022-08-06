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



# deepFreeze

This function freezes an object in a recursive way whilst handling circular references

<br/>

**Syntax:** &nbsp; `deepFreeze(obj)`

|**Parameters**|**Types**|
|-|-|
|`obj`|[**Object**](https://javascript.info/object)|

<br/>

### **Example**

**Code:**

```js
// Imports
const { deepFreeze } = require("@protagonists/deep");

// Create some object
const obj = {
  "a": "a",
  "b": "b",
  "c": {
    "d": "d"
  }
}

// Freeze object
deepFreeze(obj);

// Modify some properties
// (Throws error in strict mode)
obj.a = "c";
obj.c.d = "a";

console.log(obj);
```

**Output:**

```
{ a: 'a', b: 'b', c: { d: 'd' } }
```

---



<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
