var express = require('express'),
    port = 9000;
var expressHbs = require('express-handlebars');

var basicAuth = require('basic-auth-connect');

var app = express();

app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.use(basicAuth('username', 'password'));

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
  res.render(
    'greeting',
    {title: 'Simple greeting app', name: req.params.name
  });
});

app.listen(port, function(){
  console.log('listening on port ' + port);
});

