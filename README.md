# cry_vs

## Javascript wrapper for the Crypto-Versus api

# Table of content

* [How to use?](#how-to-use)
* [Properties](#properties)
  * [`Client.isValid`](#clientisvalid)
  * [`Client.isConnected`](#clientisconnected)
  * [`Client.token`](#clienttoken)
* [Constructor Options](#options)
  * [`create`](#create)
  * [`keyEnabled`](#keyenabled)
  * [`debug`](#debug)
  * [`ip`](#ip)
  * [`listener`](#listener)
* [Functions](#functions)
  * [`Client.login`](#clientlogin)
  * [`Client.refresh`](#clientrefresh)
  * [`Client.getApiKey`](#clientgetapikey)
  * [`Client.account.edit`](#clientaccountedit)
  * [`Client.account.delete`](#clientaccountdelete)
  * [`Client.dostuff`](#clientdostuff)
* [Events](#events)
  * [ready](#ready)
  * [debug](#debug)

# How to use?

First up, import it

`npm i @protagonists/cry_vs`

```js
const CryptoVersus = require("@protagonists/cry_vs");
```

then create a new `Client` instance!

```js
const client = new CryptoVersus.Client();
```



# Properties

## Client.isValid

### Description

`Client.isValid` returns the client's valid state  
this is usually always true unless the client was used to delete the account  
in which case the client will become invalid

### Returned value

```js
Boolean
```

### Example

#### Code:

```js
console.log(client.isValid); // true or false
```

#### Output:

    true

## Client.isConnected

### Description

`Client.isConnected` returns the client's connected state  
this is held false until `Client.login` is called successfully

### Returned value

```js
Boolean
```

### Example

#### Code:

```js
console.log(client.isConnected); // true or false
```

#### Output:

    false

## Client.token

### Description

`Client.token` returns the client's token IF connected  
otherwise, the value is left undefined

### Returned value

```js
String?
```

### Example

#### Code:

```js
console.log(client.token); // current token
```

#### Output:

    My-String-Token

# Constuctor

## Options

The constructor can be fed in several parameter options that can affect the client's behaviour  

### create

Setting the option `create` to **true** will allow the client to create an account in the off case that the client cannot connect due to a 401 response (account non-existant)  
```js
const client = new CryptoVersus.Client({create: true});
```

### keyEnabled

Setting `keyEnabled` to **true** will edit the account data to enable api keys on the account upon login in  
This is all done before the "ready" event is emitted of course, so you do not have to worry about waiting for the account to update

```js
const client = new CryptoVersus.Client({keyEnabled: true});
```

### debug

`debug` is a bit more interesting...  
It will show detailed info about all endpoint responses as well as any event data sent to the client

```js
const client = new CryptoVersus.Client({debug: true});
```

### ip

`ip` is the domain from which *webhooks* will send data to when the api is sending events

If you do not have one set with your account yet, it is highly recommended that you set one
Because clients cannot receive api events if there is no domain for the events to be sent to

```js
const client = new CryptoVersus.Client({ip: "myIpOrDomain"});
```

### listener

`listener` is the domain from which the *client* will create a listener to and handle events from

now, again, although having an ip and listener is not nessecary, it is highly suggested for otherwise, the client cannot receive events from the api

```js
const client = new CryptoVersus.Client({listener: "myIpOrDomain"});
```

*take note that if both your ip and listener are the same, you could simply use the ip alone  
The client defaults to the ip if the listener is not set



# Functions

## Client.Login

### Description

This function will essentially log you into the api using either a username and password or an api key

### Syntax

```js
Client.login(username: String, password: String)
```

or

```js
Client.login(key: String)
```

### Example

```js
client.login("username", "password");
```

or

```js
client.login("apiKey");
```

(see [getApiKey](#api-keys))

again, if you have the `create` parameter set to true in the constructor,
using the login function with a username and password will create an account instead,
although take note that this does not apply if you're using an api key

## Client.Refresh

### Description

`Client.refresh` does not serve much of a purpose except from refreshing the client's connection token  
it is automatically called a second before the token's expiration to generate a new valid token for the client

*this function does not return a `Token` nor can it be awaited

### Syntax

```js
Client.refresh(timeout: Number)
```

### Example

```js
client.refresh(timeout);
```

`timeout` is simply a timeout in milliseconds, if undefined, the timeout defaults to 0 ms

## Client.getApiKey

### Description

`Client.getApiKey()` will refresh and return a brand new api key for the current account  
if the account does not have api key enabled though, it will end up with an error

### Syntax

```js
Client.getApiKey()
```

### Example

```js
const key = await client.getApiKey();
```

having the `keyEnabled` parameter set to true in the constructor can ensure that it will be enabled once you log into the account

## Client.account.edit

### Description

`Client.account` handles account editing, from a new password to setting an event domain

### Syntax

```js
Client.account.edit(options: Any)
```

for detailed information about the expected format check out [`Account`](#account)

### Example

```js
await client.account.edit({
  username:"new_username",
  password:"new_password"
});
```

## Client.account.delete

### Description

`Client.account` is prehaps the most destructive function of them all for obvious reasons

### Syntax

```js
Client.account.delete()
```

### Example

```js
await client.account.delete();
```

After doing such, the client will be tagged as "invalid" (see [`Client.valid`](#clientisvalid))

## Client.dostuff

### Description

This function is entirely made to test out the webhook system of the api

### Syntax

```js
Client.dostuff()
```

### Example

```js
await client.dostuff();
```

Having debug messages enabled will show that an event object gets sent to the client upon calling the function


# Events

The client will occasionally send events that can be of use to users
Please take in note that the mentionned events are **NOT** the only events that can be sent from the client,  
thoses showed below are merely the events that are completely or partially handled by the client

To learn more about such events, check out this other package: [`@protagonists/emitter`](https://www.npmjs.com/package/@protagonists/emitter)

## ready

the ready event is sent when the client logs in

```js
Client.on("ready", ()=>{
  //Your code!
});
```

## debug

the debug event is sent whenever a request is sent to the api or the client receives data from the api

```js
Client.on("debug", res=>{
  //Your code!
});
```

For more information about the response object's format, go check out this package: [`@protagonists/https`](https://www.npmjs.com/package/@protagonists/https)


