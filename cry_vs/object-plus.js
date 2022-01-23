Object.defineProperty(Object, "getAllPropertyNames", {
  value:function getAllPropertyNames(obj) {
    var props = [];

    do {
      Object.getOwnPropertyNames(obj).forEach(prop=>{
        if(props.indexOf(prop) === -1)
          props.push(prop);
      });
    } while (obj = Object.getPrototypeOf(obj));

    return props;
  },
  writable:false
});

Object.defineProperty(Object, "inheritBaseProperties", {
  value:function inheritBaseProperties(original, ...objects) {
    objects.forEach(obj=>{
      Object.getOwnPropertyNames(obj).forEach(prop=>{
        var desc = Object.getOwnPropertyDescriptor(obj, prop);
        if(desc.value)
          Object.defineProperty(original, prop, {
            configurable:desc.configurable,
            enumerable:desc.enumerable,
            value:desc.value,
            writable:desc.writable
          });
        else Object.defineProperty(original, prop, {
          configurable:desc.configurable,
          enumerable:desc.enumerable,
          get:desc.get,
          set:desc.set
        });
      });
    });
  },
  writable:false
});

module.exports = { Object }
