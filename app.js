var express = require('express'),
 http = require('http'),
 path = require('path'),
 Gpio = require('onoff').Gpio,
 app = express();

//we use the port 3000
app.set('port', 3000);


app.use(express.static(path.join(__dirname, '/static')));

//se crea el servidor
var http = http.createServer(app).listen(app.get('port'), function(){
 console.log('servidor corriendo en el puerto ' + app.get('port'));
});

//Inicializar el socket.io
var io = require('socket.io')(http);


//Tanque
var tank = {

 //Pines a ser usados
init:function(){
   leftFront = new Gpio(4,'out');
   leftBack = new Gpio(17,'out');
   rightFront = new Gpio(18,'out');
   rightBack = new Gpio(23,'out');
},

 //Movimiento hacia adelante
 moveForward: function(){
     console.log('forward');
     leftFront.writeSync(1),
     rightFront.writeSync(1)
 },

 //Movimiento hacia atras
 moveBackward: function(){
     console.log('back');
     leftBack.writeSync(1),
     rightBack.writeSync(1)
 },

 //Movimiento hacia la izquierda
 moveLeft: function(){
   console.log('left');
   leftFront.writeSync(1);
 },

 //movimiento hacia la derecha
 moveRight: function(){
  console.log('right');
  rightFront.writeSync(1);
 },

 //parar los motores
 stop: function(){
     leftFront.writeSync(0),
     leftBack.writeSync(0),
     rightFront.writeSync(0),
     rightBack.writeSync(0)
 }
};

//esperar por la conección
io.sockets.on('connection', function(socket) {
 //esperar la señal de los motores
 socket.on('move', function(direction) {
   switch(direction){
    case 'up':
       tank.moveForward();
       break;
     case 'down':
       tank.moveBackward();
       break;
     case 'left':
       tank.moveLeft();
       break;
     case 'right':
       tank.moveRight();
       break;
   }
 });
 //esperar la señal de parado
 socket.on('stop', function(dir){
   tank.stop();
   console.log('stop');
 });
});

//iniciar el objeto tank
tank.init();
