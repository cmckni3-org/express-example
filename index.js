var express = require('express'),
    port = 9000;

var app = express();

app.use(function(req, res, next){
  console.log('hello from the middleware!');
  next();
});

app.use(function(req, res, next){
  console.log('doing async stuff...');
  setTimeout(function(){
    console.log('done!');
    next();
  }, 1000);
});

app.get('/:name', function(req, res){
  res.send("hello, " + req.params.name)
});

app.listen(port, function(){
  console.log('listening on port ' + port);
});

