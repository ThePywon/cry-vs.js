let unlocked = false;

class Enum {
  constructor(name, ...args) {
    if(Enum[name])
      throw new Error("Enumerator name is taken");

    if(args.length === 0)
      throw new Error("Cannot create empty enumerator");
    else if(args.length === 1) {
      if(args[0] instanceof Array) {
        for(let i = 0; i < args[0].length; i++) {
          const name = args[0][i].toString();
          const symbol = Symbol(name);
          this[i] = symbol;
          this[name] = symbol;
        }
      }
      else throw new Error("Cannot create singleton enumerator");
    }
    else for(let i = 0; i < args.length; i++) {
      const name = args[i].toString();
      const symbol = Symbol(name);
      this[i] = symbol;
      this[name] = symbol;
    }

    unlocked = true;
    Enum[name] = this;
  }
}
Object.defineProperty(Enum, "name", {
  enumerable: true,
  value: v => v.description
});

const proxy = new Proxy(Enum, {
  set: (obj, prop, value) => {
    if(unlocked) {
      unlocked = false;
      obj[prop] = value;
    }
  }
});

module.exports = proxy;
