const { Client } = require('./cry-vs');
const client = new Client({ debug: true, dev: true });

require("dotenv").config();

client.on("ready", async () => {
  console.log(client.toString());
  console.log(`We have logged in as ${client.account.user}!`);
});

console.log(client.toString());
client.login(process.env["KEY"]);
