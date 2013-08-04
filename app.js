
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');

routes.register = require('./routes/register');
routes.login = require('./routes/login');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.session({secret: 'am_sarmale'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/register', routes.register.render);
app.get('/login', routes.login.render);
app.get('/users', user.list);

app.post('/register', routes.register.process);
app.post('/login', routes.login.process);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
