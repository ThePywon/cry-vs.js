const { Schema } = require("@protagonists/coerce");

const ClientOptions = new Schema({
  debug: Boolean,
  keyEnabled: Boolean,
  create: Boolean,
  dev: Boolean
});
ClientOptions.setDefaults({
  debug: false,
  keyEnabled: false,
  create: false,
  dev: false
});

module.exports = { ClientOptions };
