# cry_vs

## Javascript wrapper for the Crypto-Versus api

## How to use?

## Functions

### Constuctor

first up, import it

    const CryptoVersus = require("@protagonists/cry_vs");

then create a new `Client` instance!

    const client = new CryptoVersus.Client();

the constructor can be fed in several options that can affect the client's behaviour  
for example, feeding in `create: true` will allow the client to create an account in the off case that the client cannot connect due to a 401 response (account non-existant)  
and feeding in `keyEnabled: true` will edit the account info to enable api keys on the account upon login in

    const client = new CryptoVersus.Client({create: true, keyEnabled: true});

### Login

to finally use the client, you can login using `Client.login`

    client.login(apiKey);

(see [getApiKey](#api-keys))

or

    client.login(username, password);

again, if you had the `create` parameter set to true in the constructor, using the login function with a username and password will create an account instead

### Refresh*

`Client.refresh()` does not serve much of a purpose except from refreshing the client's connection token  
it is automatically called a second before the token's expiration to generate a new valid token for the client

    client.refresh(timeout);

`timeout` is simply a timeout in milliseconds, if undefined, the timeout defaults to 0 ms

\*this function does not return a `Token` nor is it asynchronous

### Api Keys

`Client.getApiKey()` will refresh and return a brand new api key for the current account  
if the account does not have api key enabled though, it will end up with an error

    const key = await client.getApiKey();

having the `keyEnabled` parameter set to true in the constructor can ensure that it will be enabled once you log into the account

### Edit Account

`Client.account` is an object that handles account handling endpoints such as `/api/account/edit`

    await client.account.edit({
      username:[username],
      password:[password],
      keyEnabled:[keyEnabled]
    });

\[username] is the new username to set to the account  
\[password] is the new password to set to the account  
\[keyEnabled] edits either api keys are enabled or disabled on the account

### Delete Account

`Client.account` also contains a function that interacts with `/api/account/delete`

    await client.account.delete();

After doing such, the client will be tagged as "invalid" (see [valid](#valid))



## Events

the client will occasionally send events that can be of use to us users

### ready

the ready event is sent when the client logs in

    Client.on("ready", ()=>{
      //Your code!
    });

### debug

the debug event is sent whenever a request is sent to the api

    Client.on("debug", res=>{
      //Your code!
    });

it is passed in a response object info such as the status, content and headers and more

    Client.on("debug", console.log);

console:

    {
      url:[endpoint],
      content:[response content],
      headers:{
        [headers]
      },
      status:{
        code:[status code],
        message:[status message]
      }
    }

\[endpoint] is the fetched endpoint  
\[response content] is the api response content  
\[headers] are the api response's headers  
\[status code] is the api response status code  
\[status message] is the api response status message



## Properties

### Valid

`Client.isValid` returns the client's valid state  
this is usually always true unless the client was used to delete the account  
in which case the client will become invalid

    console.log(client.isValid); // true or false

### Connected

`Client.isConnected` returns the client's connected state  
this is held false until `Client.login` is called successfully

    console.log(client.isConnected); // true or false

### Token

`Client.token` returns the client's token IF connected  
otherwise, the value is left undefined

    console.log(client.token); // current token


