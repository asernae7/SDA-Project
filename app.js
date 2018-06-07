var express = require('express'),
 http = require('http'),
 path = require('path'),
 async = require('async'),
 gpio = require('rpi-gpio'),
 Gpio = require('onoff').Gpio,
 app = express();
 
//we use the port 3000
app.set('port', 3000);
 
//we serve the static files of the directory /static
app.use(express.static(path.join(__dirname, '/static')));
 
//we create the server
var http = http.createServer(app).listen(app.get('port'), function(){
 console.log('Server was started by using the port ' + app.get('port'));
});
 
//we initialise socket.io
var io = require('socket.io')(http);
 
//the code controlling the tank starts here
//----------------------------------
 
//we create the object tank
var tank = {
 
 //we create an object with the used pins
 motors: {
   leftFront: 4,
   leftBack: 17,
   rightFront: 18,
   rightBack: 23
 },
 
 //we open the gpio pins and set them as outputs
init:function(){
   gpio.setup(4,gpio.DIR_OUT,this);
   gpio.setup(17,gpio.DIR_OUT,this);
   gpio.setup(18,gpio.DIR_OUT,this);
   gpio.setup(23,gpio.DIR_OUT,this);
   leftFront = new Gpio(4,'out');
   leftBack = new Gpio(17,'out');
   rightFront = new Gpio(18,'out');
   rightBack = new Gpio(23,'out');
},
 
 //in order to move the tank forward, we supply both motors
 moveForward: function(){
     console.log('forward');
     leftFront.writeSync(1),
     rightFront.writeSync(1)
     //gpio.write(this.motors.leftFront,true),
     //gpio.write(this.motors.rightFront,true)
 },
 
 //in order to move the tank backwards we supply the motors, but with inverse polarity
 moveBackward: function(){
     console.log('back');
     leftBack.writeSync(1),
     rightBack.writeSync(1)
     //gpio.write(17,true),
     //gpio.write(23,true)
 },
 
 //in order to turn right, we supply the motor on the left
 moveLeft: function(){
   console.log('left');
   leftFront.writeSync(1);
   //gpio.write(4, true);
 },
 
 //in order to turn left, we supply the motor on the right
 moveRight: function(){
  console.log('right');
  rightFront.writeSync(1);
  //gpio.write(23, true);
 },
 
 //in order to stop both motors, we set the all pins to 0 value
 stop: function(){
     leftFront.writeSync(0),
     leftBack.writeSync(0),
     rightFront.writeSync(0),
     rightBack.writeSync(0)
     //gpio.write(4, false),
     //gpio.write(17, false),
     //gpio.write(18, false),
     //gpio.write(23, false)
 }
};
 
//we listen to new connections
io.sockets.on('connection', function(socket) {
 //we listen the movement signal
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
 //we listen to the stop signal
 socket.on('stop', function(dir){
   tank.stop();
   console.log('stop');
 });
});
 
//we initialise the tank
tank.init();

