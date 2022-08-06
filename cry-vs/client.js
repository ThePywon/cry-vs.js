"use strict";

const { Post } = require("@protagonists/https");
const host = "cry-vs.herokuapp.com";
const devhost = "localhost";
//const devhost = "beta-cry-vs.herokuapp.com";

//const handler = require("./host.js");

const { Logger, Color } = require("@protagonists/logger");
const { Schema } = require("@protagonists/coerce");
const { ClientOptions } = require("./Options");
const Enum = require("./enum");
const states = new Enum("State", "Not Connected", "Connected", "Invalid");

function Client(options) {
  // Clean up passed parameters
  options = ClientOptions(options);

  // Set this instance as a logger
  Logger.setLogger(this);
  // Disable debug messages logging if the parameter is false
  if(!options.debug)
    this.disableDefault("debug");

  const client = this;

  let state = states[0];
  let token;
  let user;
  let keyEnabled;

  // Shorthand
  const err = res => { client.error(`${res.status.message} ${res.status.code}\n${res.content}`) };

  async function signup(data) {
    // Make sure client is not already connected nor invalid
    if(state == states[1])
      return client.error("Cannot connected twice!") && client;
    else if(state == states[2])
      return client.error("Current client is invalid.") && client;

    // Fetch response from api
    const response = await Post({
      host: options.dev ? devhost : host,
      path: "/api/signup"
    }, data);

    // Debug
    client.debug(response);

    // Valid response
    if(response.status.code == 200) {
      // Ready up
      token = response.content;
      keyEnabled = response.headers.keyenabled == "true";
      user = response.headers.user;
      state = states[1];

      // Refresh connection after timeout
      _refresh(response.headers.expire);

      // Emit the ready event
      client.emit("ready");

      return client;
    }
    // Invalid
    else return err(response) && client;
  }

  async function login(...args) {
    // Make sure client is not already connected nor invalid
    if(state == states[1])
      return client.error("Cannot connected twice!") && client;
    else if(state == states[2])
      return client.error("Current client is invalid.") && client;

    // No arguments passed, ignore
    if(args.length === 0)
      return client.error("Login unsuccessful. Invalid arguments length.") && client;
    
    // Create login data from arguments
    const loginData = args.length > 1 ? { username: args[0], password: args[1] } : { key: args[0] };

    // Fetch response from api
    const response = await Post({
      host: options.dev ? devhost : host,
      path: "/api/login"
    }, loginData);

    // Debug
    client.debug(response);

    // Valid response
    if(response.status.code == 200) {
      // Ready up
      token = response.content;
      keyEnabled = response.headers.keyenabled == "true";
      user = response.headers.user;
      state = states[1];

      // Edit account if not matching parameters
      if(!options[Schema.isDefault].keyEnabled && options.keyEnabled != keyEnabled)
        await client.account.edit({ token, keyEnabled: options.keyEnabled });

      // Refresh connection after timeout
      _refresh(response.headers.expire);

      // Emit the ready event
      client.emit("ready");

      return client;
    }
    // Invalid but can create account
    else if(options.create && args.length > 1 && response.status.code == 403 && response.content == "Invalid credentials.")
      await signup({ ...loginData, keyEnabled: options.keyEnabled });
    // Invalid
    else return err(response) && client;
  }

  async function getKey() {
    // Make sure client is not already connected nor invalid
    if(state == states[0])
      return client.error("Client must be connected in order to execute this action.") && null;
    else if(state == states[2])
      return client.error("Current client is invalid.") && null;

    // Make sure the client can fetch an api key
    if(!keyEnabled)
      return client.error("Api keys are disabled for this account!") && null;
    
    // Fetch response from api
    const response = await Post({
      host: options.dev ? devhost : host,
      path: "/api/key"
    }, { token });

    // Debug
    client.debug(response);

    // Valid response
    if(response.status.code == 200) {
      return response.content;
    }
    // Invalid
    else return err(response) && null;
  }

  async function edit(data) {
    // Make sure client is not invalid
    if(state == states[2])
      return client.error("Current client is invalid.") && client;

    // Fetch response from api
    const response = await Post({
      host: options.dev ? devhost : host,
      path: "/api/edit-account"
    }, data);

    // Debug
    client.debug(response);

    // Valid
    if(response.status.code == 200) {
      // Update info
      keyEnabled = response.headers.keyenabled == "true";
      user = response.headers.user;
      
      // Refresh connection after timeout
      _refresh(response.headers.expire);

      return client;
    }
    // Invalid
    else return err(response) && client;
  }

  async function _delete() {
    // Make sure client is not invalid
    if(state == states[2])
      return client.error("Current client is invalid.") && client;

    // Fetch response from api
    const response = await Post({
      host: options.dev ? devhost : host,
      path: "/api/delete-account"
    }, { token });

    // Debug
    client.debug(response);

    // Update client state
    state = states[2];
    clearTimeout(refreshTimeout);

    // Invalid
    if(response.status.code != 200)
      return err(response) && client;
    
    return client;
  }

  let refreshTimeout;
  function _refresh(dateStr) {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(refresh, new Date(dateStr) - Date.now() - 1000);
  }

  async function refresh() {
    // Make sure client is not invalid
    if(state == states[2])
      return client.error("Current client is invalid.") && client;

    // Fetch response from api
    const response = await Post({
      host: options.dev ? devhost : host,
      path: "/api/refresh-token"
    }, { token });

    // Debug
    client.debug(response);

    // Valid
    if(response.status.code == 200) {
      // Update token
      token = response.content;

      // Refresh connection after timeout
      _refresh(response.headers.expire);

      // Emit corresponding event
      client.emit("refresh");

      return client;
    }
    // Invalid
    else {
      err(response);
      state = states[2];
      clearTimeout(refreshTimeout);
      return client;
    }
  }

  // Define all the props
  Object.defineProperties(client, {
    "login": {
      enumerable: true, value: login
    },
    "getKey": {
      enumerable: true, value: getKey
    },
    "refresh": {
      enumerable: true, value: refresh
    },
    "state": {
      enumerable: true,
      get: () => { return state.description }
    },
    "token": {
      enumerable: true,
      get: () => { return token }
    },
    "account": {
      enumerable: true,
      get: () => {
        return { user, keyEnabled, edit, delete: _delete }
      }
    }
  });
}
Object.defineProperty(Client.prototype, "toString", {
  value: function toString() {
    return `Client { ${Color.cyan('<'+this.state+'>')} }`;
  },
  configurable: true
});

module.exports = Client;
