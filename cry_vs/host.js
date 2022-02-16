const http = require("http");
const Emitter = require("@protagonists/emitter");
'use strict';

const host = {};
Emitter.setEmitter(host);

let h;
Object.defineProperty(host, "host", {
  enumerable:true,
  get:()=>{return h}
});

Object.defineProperty(host, "create", {
  enumerable:true,
  value:function create(h) {
    const server = http.createServer(requestListener);

    server.listen(443, h, () => host.emit("ready"));
  },
  writable:false
});

function requestListener(req, res) {
  let data = "";
  req.on("data", d=>{
    data += d.toString();
  });

  req.on("end", ()=>{
    if(req.method === 'GET')
      host.emit("getRequest", req, res);
    else if(req.method === 'POST')
      host.emit("postRequest", req, res, data);
    res.end();
  });
}

module.exports = host;
