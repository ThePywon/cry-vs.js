const handler = require("./https_handler.js");
const Emitter = require("./emitter.js");

const host = "cry-vs.herokuapp.com";

var client;
(()=>{
var key = false;

client = function(options) {
  if(options && options.keyEnabled !== undefined && typeof options.keyEnabled != "boolean")
    throw new Error("Client: Contructor parameter keyEnabled is not of type bool.");
  if(options && options.create !== undefined && typeof options.create != "boolean")
    throw new Error("Client: Contructor parameter create is not of type bool.");

  var emitter = new Emitter();
  Object.defineProperty(this, "events", {
    get:()=>{return emitter.events}
  });
  Object.defineProperty(this, "on", {
    enumerable:true,
    get:()=>{return emitter.on}
  });
  Object.defineProperty(this, "emit", {
    enumerable:true,
    get:()=>{return emitter.emit}
  });

  var isValid = true;
  Object.defineProperty(this, "isValid", {
    enumerable:true,
    get:()=>{return isValid}
  });
  var isConnected = false;
  Object.defineProperty(this, "isConnected", {
    enumerable:true,
    get:()=>{return isConnected}
  });

  Object.defineProperty(this, "login", {
    enumerable:true,
    get:()=>{return (...args)=>{
      return new Promise((resolve, reject)=>{
        if(this.isConnected)
          throw new Error("Client: Cannot connect twice!");
        if(!this.isValid)
          throw new Error("Client: Current client is invalid.");

        var loginOptions;
        if(args.length == 2)
          loginOptions = { 
            username: args[0],
            password: args[1]
          }
        else if(args.length == 1)
          loginOptions = { key: args[0] }
        else throw new Error("Client: Function login called in an unexpected way.");

        handler.Post({
          host, path:"/login"
        }, loginOptions, res=>{

          if(res.status.code == 200) {
            var user = {};
            Object.defineProperty(user, "name", {
              enumerable:true,
              get:()=>{return res.headers.user},
              set:val=>{if(key) res.headers.user = val}
            });
            Object.defineProperty(user, "keyEnabled", {
              enumerable:true,
              get:()=>{return res.headers.key === "true"},
              set:val=>{if(key) res.headers.key = val}
            });
            Object.defineProperty(this, "user", {
              enumerable:true,
              get:()=>{return user}
            });

            var token = res.content;
            Object.defineProperty(this, "token", {
              enumerable:true,
              get:()=>{return token},
              set:val=>{if(key) token = val}
            });

            var finish = ()=>{
              isConnected = true;
              this.refresh(res.headers.expire-1000);
              this.emit("ready");
              resolve(res.content);
            }

            if(options && options.keyEnabled !== undefined) {
              this.account.edit({ keyEnabled: options.keyEnabled }).then(finish);
            }
            else finish();      
          }
          else {
            if(options && options.create) {
              handler.Post({
                host, path:"/signup"
              }, { ...loginOptions, keyEnabled: options.keyEnabled }, res=>{
                if(res.status.code == 200) {
                  var user = {};
                  Object.defineProperty(user, "name", {
                    enumerable:true,
                    get:()=>{return res.headers.user},
                    set:val=>{if(key) res.headers.user = val}
                  });
                  Object.defineProperty(user, "keyEnabled", {
                    enumerable:true,
                    get:()=>{return res.headers.key === "true"},
                    set:val=>{if(key) res.headers.key = val}
                  });
                  Object.defineProperty(this, "user", {
                    enumerable:true,
                    get:()=>{return user}
                  });

                  var token = res.content;
                  Object.defineProperty(this, "token", {
                    enumerable:true,
                    get:()=>{return token},
                    set:val=>{if(key) token = val}
                  });

                  isConnected = true;
                  this.refresh(res.headers.expire-1000);
                  this.emit("ready");
                    resolve(res.content);
                }
                else throw new Error(`${res.status.message} ${res.status.code}\n${res.content}`);
              });
            }
            else throw new Error(`${res.status.message} ${res.status.code}\n${res.content}`);
          }
        });
      });
    }}
  });

  Object.defineProperty(this, "refresh", {
    enumerable:true,
    get:()=>{return timeout=>{

      setTimeout(()=>{

        if(!this.isValid) return;

        handler.Post({
          host, path:"/refresh-token"
        }, {
          token: this.token
        }, res=>{

          if(res.status.code == 200) {
            key = true;
            this.token = res.content;
            key = false;
            this.refresh(res.headers.expire-1000);
          }
          else throw new Error(`${res.status.message} ${res.status.code}\n${res.content}`);
        });
      }, timeout);
    }}
  });

  Object.defineProperty(this, "getApiKey", {
    enumerable:true,
    get:()=>{return ()=>{

      return new Promise((resolve, reject)=>{
        if(!this.isValid) 
          throw new Error("Client: Current client is invalid.");
        if(!this.user.keyEnabled)
          throw new Error("Client: Api key disabled.");

        handler.Post({
          host, path:"/key"
        }, {
          token: this.token
        }, res=>{

          if(res.status.code == 200) {resolve(res.content)}
          else throw new Error(`${res.status.message} ${res.status.code}\n${res.content}`);
        });
      });
    }}
  });

  var account = {};
  Object.defineProperty(account, "edit", {
    enumerable:true,
    get:()=>{return options=>{

      return new Promise((resolve, reject)=>{
        if(!this.isValid) 
          throw new Error("Client: Current client is invalid.");
        
        handler.Post({
          host, path:"/edit-account"
        }, {
          token: this.token,
          ...options
        }, res=>{
          
          if(res.status.code == 200) {
            key = true;
            this.user.name = res.headers.user;
            this.user.keyEnabled = res.headers.key;
            key = false;
            resolve();
          }
          else throw new Error(`${res.status.message} ${res.status.code}\n${res.content}`);
        });
      });
    }}
  });
  Object.defineProperty(account, "delete", {
    enumerable:true,
    get:()=>{return ()=>{

      return new Promise((resolve, reject)=>{
        if(!this.isValid) 
          throw new Error("Client: Current client is invalid.");

        handler.Post({
          host, path:"/delete-account"
        }, {
          token: this.token
        }, res=>{

          if(res.status.code == 200) {
            isValid = false;
            resolve();
          }
          else throw new Error(`${res.status.message} ${res.status.code}\n${res.content}`);
        });
      });
    }}
  });

  Object.defineProperty(this, "account", {
    enumerable:true,
    get:()=>{return account}
  });
}
})()
const Client = client;
client = undefined;
delete(client);

module.exports = Client;
