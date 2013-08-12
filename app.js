var express = require('express');
var gaes = require('./ext/gibberish-aes.js');
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 

app.get('/', function(req, res){
  gaes.size(128);
  res.send(gaes.enc("This sentence is super secret", "ultra-strong-password"));
});

parseToken = function(req, res) {
    var text = req.body.text.replace(/ /g,'+');
    var pass = req.body.pass;
    //console.log(req.body);
    //console.log(text);
    //console.log(pass);
    gaes.size(128);
    res.send(gaes.dec(text, pass));
}

app.post('/api', parseToken);

app.listen(3000);

