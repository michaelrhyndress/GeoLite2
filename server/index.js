//Load express module with `require` directive
var express = require('express')
var app = express()
const GeoIP = require('./utils/geoip2-wrapper.js');

const PORT = 8081;

//Define request response in root URL (/)
app.get('/', async function (req, res) {
    res.set({
      "Content-Type": "application/json; charset=UTF-8",
      "X-Content-Type-Options": "nosniff",
      "X-Xss-Protection": "1; mode=block",
      "Strict-Transport-Security":  "max-age=30536000",
      "X-Frame-Options": "Deny",
      "Access-Control-Allow-Origin": "*"
    });

    let ip = req.query.ip;
    
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) == false) {
      res.status(400)
      res.send("Bad Request");
    } else {
      try {
        res.send(await GeoIP(ip));
        res.status(200)
      } catch {
        res.status(500)
        res.send("Error");
      }
    }
    res.end();
    return;
})

//Launch listening server on port
app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}!`)
})