"use strict";

const handler = require("@protagonists/https");
const host = "crypto-versus.pywon.repl.co";

const hostHandler = require("./host.js");

const { Logger } = require("@protagonists/logger");

function Client(options) {
  options = options || {};
  options.keyEnabled = !!options.keyEnabled;
  options.create = !!options.create;
  options.debug = !!options.debug;
  options.events = options.events === undefined || !!options.events;
  Logger.setLogger(this);
  !options.debug ? this.disableDefault("debug") : null;
  if(options.ip && typeof options.ip !== "string") {
    this.crit("Parameter 'ip' is not type of string. Ignored.");
    options.ip = undefined;
  }
  if(options.events && !options.listener && !options.ip) {
    this.crit("Cannot listen for events without having at least 'listener' or 'ip' parameter. Ignored.");
    options.events = false;
  }
  if(!options.events) {
    this.warn("Event listener is disabled, you can not receive any event update.");
  }


  const events = {};
  let eventsEnabled = false;
  let ip;
  Object.defineProperties(events, {
    enabled:{
      enumerable:true,
      get:()=>{return eventsEnabled}
    },
    ip:{
      enumerable:true,
      get:()=>{return ip}
    }
  });
  Object.freeze(events);
  const user = {}
  let username;
  let keyEnabled = false;
  Object.defineProperties(user, {
    name:{
      enumerable:true,
      get:()=>{return username}
    },
    keyEnabled:{
      enumerable:true,
      get:()=>{return keyEnabled}
    },
    events:{
      enumerable:true,
      value:events,
      writable:false
    }
  });
  Object.defineProperty(this, "user", {
    enumerable:true,
    value:user,
    writable:false
  });
  Object.freeze(user);


  const account = {};
  Object.defineProperty(this, "account", {
    enumerable:true,
    value:account,
    writable:false
  });


  let token;
  Object.defineProperty(this, "token", {
    enumerable:true,
    get:()=>{return token}
  });


  let isValid = true;
  let isConnected = false;
  Object.defineProperties(this, {
    isValid:{
      enumerable:true,
      get:()=>{return isValid}
    },
    isConnected:{
      enumerable:true,
      get:()=>{return isConnected}
    }
  });


  Object.defineProperty(account, "edit", {
    enumerable:true,
    value:(options)=>{

      return new Promise((resolve, reject)=>{
        if(!this.isValid) {
          this.error("Current client is invalid.");
          return;
        }
        
        handler.Post({
          host, path:"/api/edit-account"
        }, {
          token: this.token,
          ...options
        }, res=>{
          this.debug(res);
          
          if(res.status.code == 200) {
            username = res.headers.user;
            keyEnabled = res.headers.key;
          }
          else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
          resolve();
        });
      });
    },
    writable:false
  });

  Object.defineProperty(account, "delete", {
    enumerable:true,
    value:()=>{

      return new Promise((resolve, reject)=>{
        if(!this.isValid) {
          this.error("Current client is invalid.");
          return;
        }

        handler.Post({
          host, path:"/api/delete-account"
        }, {
          token: this.token
        }, res=>{
          this.debug(res);

          if(res.status.code == 200)
            isValid = false;
          else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
          resolve();
        });
      });
    },
    writable:false
  });
  Object.freeze(account);


  let refreshTimeout = setTimeout(()=>{},0);

  if(options.events) {
    hostHandler.create(options.listener || options.ip);
    if(options.debug)
      hostHandler.on("postRequest", (req, res, data)=>{this.debug(data)});
  }


  Object.defineProperty(this, "login", {
    enumerable:true,
    value:function login(...args) {
      return new Promise((resolve, reject)=>{
        if(this.isConnected) {
          this.crit("Cannot connect twice!");
          return;
        }
        if(!this.isValid) {
          this.error("Current client is invalid.");
          return;
        }

        var loginOptions;
        if(args.length == 2)
          loginOptions = { 
            username: args[0],
            password: args[1]
          }
        else if(args.length == 1)
          loginOptions = { key: args[0] }
        else {
          this.crit("Function login called in an unexpected way.");
          return;
        }

        handler.Post({
          host, path:"/api/login"
        }, loginOptions, res=>{
          this.debug(res);

          if(res.status.code == 200) {
            username = res.headers.user;
            keyEnabled = res.headers.key === "true";

            token = res.content;

            const finish = ()=>{
              isConnected = true;
              this.refresh(res.headers.expire-1000);
              this.emit("ready");
              resolve(res.content);
            }

            if(options.keyEnabled || options.events) {
              this.account.edit({ keyEnabled: options.keyEnabled, events: {enabled: options.events, ip: options.ip}}).then(finish);
            }
            else finish();      
          }
          else if(res.status.code === 401) {
            if(options.create) {
              handler.Post({
                host, path:"/api/signup"
              }, { ...loginOptions, keyEnabled: options.keyEnabled, events:{enabled: !!options.events, ip:"206.162.131.162"}}, res=>{
                this.debug(res);

                if(res.status.code === 200) {
                  username = res.headers.user;
                  keyEnabled = res.headers.key === "true";

                  token = res.content;

                  isConnected = true;
                  this.refresh(res.headers.expire-1000);
                  this.emit("ready");
                  resolve(res.content);
                }
                else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
                return;
              });
            }
            else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
            return;
          }
        });
      });
    },
    writable:false
  });

  Object.defineProperty(this, "refresh", {
    enumerable:true,
    value:function refresh(timeout) {

      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(()=>{

        if(!this.isValid) {
          this.error("Current client is invalid.");
          return;
        }

        handler.Post({
          host, path:"/api/refresh-token"
        }, { token }, res=>{
          this.debug(res);
          this.log(token);
          this.log(res.content);

          if(res.status.code == 200) {
            token = res.content;
            this.refresh(res.headers.expire-1000);
          }
          else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
          return;
        });
      }, timeout);
    },
    writable:false
  });

  Object.defineProperty(this, "getApiKey", {
    enumerable:true,
    value:function getApiKey() {

      return new Promise((resolve, reject)=>{
        if(!this.isValid) {
          this.error("Current client is invalid.");
          return;
        }
        if(!keyEnabled) {
          this.error("Api key disabled.");
          return;
        }

        handler.Post({
          host, path:"/api/key"
        }, { token }, res=>{
          this.debug(res);

          if(res.status.code == 200) {resolve(res.content)}
          else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
          return;
        });
      });
    },
    writable:false
  });

  Object.defineProperty(this, "dostuff", {
    enumerable:true,
    value:function dostuff() {

      return new Promise((resolve, reject)=>{
        if(!this.isValid) {
          this.error("Current client is invalid.");
          return;
        }

        handler.Post({
          host, path:"/api/dostuff"
        }, { token }, res=>{
          this.debug(res);

          if(res.status.code == 200) {resolve(res.content)}
          else this.error(`${res.status.message} ${res.status.code}\n${res.content}`);
          return;
        });
      });
    },
    writable:false
  });
}

Object.defineProperty(Client, "name", {value:"Client"});
Object.defineProperty(Client, "toString", {
  value:function toString() {
    return `Client { ${this.isValid ? this.isConnected ? this.token : "Not Connected" : "Invalid"} }`
  }
});

module.exports = Client;
