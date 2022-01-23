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
    value:function on(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      this._events.unlock(key);
      this._events.add({name,callback});
      this._events.lock();
    },
    writable:false
  });

  Object.defineProperty(this, "once", {
    enumerable:true,
    value:function once(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      this._events.unlock(key);
      this._events.add({name,callback,once:true});
      this._events.lock();
    },
    writable:false
  });

  Object.defineProperty(this, "emit", {
    enumerable:true,
    value:function emit(name, ...args) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      for(let i = 0; i < this.events.length; i++)
        if(this.events[i].name == name)
          if(this.events[i].once) {
            let callback = this.events[i].callback;
            this._events.unlock(key);
            this._events.remove(this._events.value[i]);
            this._events.lock();
            callback(...args);
          }
          else this.events[i].callback(...args);
    },
    writable:false
  });
}

Emitter.prototype.valueOf = function valueOf()
{return this.events}
Emitter.prototype.toString = function toString()
{return "[object Emitter]"}

module.exports = Emitter;
