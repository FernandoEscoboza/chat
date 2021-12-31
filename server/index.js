var express = require('express');
// const response = require('express/lib/response');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// var port = 6677;

// cargando archivos estaticos
app.use(express.static('client'));

app.get('/', function(req, res){
    res.status(200).send('Hello desde ruta');
    console.log('Function get');
});

var messages=[{
    id: 1,
    text: 'Bienvenido al chat privado de Fernando Escoboza',
    nickname: 'Bot - fernandoescoboza21@gmail.com',
}];


// Socket
console.log('Antes del io.on');

io.on('connection', function(socket){
    console.log('El nodo '+socket.handshake.address+' se ha conectado');
    
    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        socket.emit('messages', messages);
    });
});

console.log('Despues del io.on');

server.listen(6677, function(){
    console.log('Run Server');
});
