var express =require('express');
var todoController=require('./controllers/todoControllers');
var http=require('http');
var debug = require('debug')('express-todo-zhi:server');

var app=express();
app.set('view engine','ejs');
app.use(express.static('./public'));

todoController(app);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
// app.listen(3000);

// console.log('listing port 3000');
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }