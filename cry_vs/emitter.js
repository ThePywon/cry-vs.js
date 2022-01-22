const LockedArray = require("./locked_array.js");

const Emitter = function() {

  var events = new LockedArray();
  Object.defineProperty(this, "_events", {
    get:()=>{return events}
  });
  Object.defineProperty(this, "events", {
    enumerable:true,
    get:()=>{return events.value}
  });
  
  var key = this._events.key;

  Object.defineProperty(this, "on", {
    enumerable:true,
    get:()=>{return (name, callback)=>{
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      this._events.unlock(key);
      this._events.add({name,callback});
      this._events.lock();
    }}
  });

  Object.defineProperty(this, "once", {
    enumerable:true,
    get:()=>{return (name, callback)=>{
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      this._events.unlock(key);
      this._events.add({name,callback,once:true});
      this._events.lock();
    }}
  });

  Object.defineProperty(this, "emit", {
    enumerable:true,
    get:()=>{return (name, ...args)=>{
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      for(let i = 0; i < this._events.value.length; i++)
        if(this.events[i].name == name) {
          this.events[i].callback(...args);
          if(this.events[i].once) {
            this._events.unlock(key);
            this._events.remove(this._events.value[i]);
            this._events.lock();
          }
        }
    }}
  })
}

Emitter.prototype.valueOf = function valueOf()
{return this.events}
Emitter.prototype.toString = function toString()
{return "[object Emitter]"}
Emitter.from = function from(obj) {
  let emitter = new Emitter();
  Object.defineProperty(obj, "_events", {
    get:()=>{return emitter._events}
  });
  Object.defineProperty(obj, "events", {
    enumerable:true,
    get:()=>{return emitter.events}
  });
  Object.defineProperty(obj, "on", {
    enumerable:true,
    get:()=>{return emitter.on}
  });
  Object.defineProperty(obj, "once", {
    enumerable:true,
    get:()=>{return emitter.once}
  });
  Object.defineProperty(obj, "emit", {
    enumerable:true,
    get:()=>{return emitter.emit}
  });
}

module.exports = Emitter;
