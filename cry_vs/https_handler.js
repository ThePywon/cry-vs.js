const https = require('https');
function Get(info, callback) {
  var options = {
    host: info.host,
    port: info.port || 443,
    path: info.path || "/",
    method: 'GET'
  }

  request(options, callback);
}

function Post(info, data, callback) {
  var options = {
    host: info.host,
    port: info.port || 443,
    path: info.path || "/",
    method: 'POST',
    headers: info.header || {}
  }

  request(options, callback, JSON.stringify(data));
}

function request(options, callback, data) {
  var result = "";

  const req = https.request(options, res => {

    res.on('data', d => {
      result += d.toString();
    });
    
    res.on('end', ()=> {
      try {
        try {
          result = JSON.parse(result);
          callback({
          content:result,
          headers:res.headers,
          status:{
            code:res.statusCode,
            message:res.statusMessage
          }
        });
        }
        catch(e){callback({
          content:result,
          headers:res.headers,
          status:{
            code:res.statusCode,
            message:res.statusMessage
          }
        })}
      }
      catch(err) {console.error(err)}
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  data ? req.write(data) : 0;
  req.end();
}
module.exports = { Get, Post };
