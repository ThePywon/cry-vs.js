const LockedArray = require("./locked_array.js");

const Emitter = function() {

  var events = new LockedArray();
  Object.defineProperty(this, "events", {
    enumerable:true,
    get:()=>{return events}
  });
  
  var key = this.events.key;

  Object.defineProperty(this, "on", {
    enumerable:true,
    get:()=>{return (name, callback)=>{
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      this.events.unlock(key);
      this.events.add({name,callback});
      this.events.lock();
    }}
  });

  Object.defineProperty(this, "emit", {
    enumerable:true,
    get:()=>{return (name, ...args)=>{
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      for(let i = 0; i < this.events.value.length; i++)
        if(this.events.value[i].name == name)
          this.events.value[i].callback(...args);
    }}
  })
}

module.exports = Emitter;
