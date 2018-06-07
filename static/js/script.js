$(function () {
 var socket = io.connect(), //uso de socket
   ui = {
     up: $('.btn-up'),
     left: $('.btn-left'),
     down: $('.btn-down'),
     right: $('.btn-right'),
     all: $('.btn')
   },
   activeClass = 'is-active',
   isPressed = false;

 //esperar por el teclado
 $(document).keydown(function(e){
   //when we keep the key pressed
   if(isPressed) return;

   isPressed = true;
   switch(e.which){
     case 87: //ASCII de w
       socket.emit('move', 'up');
       ui.up.addClass(activeClass);
       break;
     case 65:
       socket.emit('move', 'left');
       ui.left.addClass(activeClass);
       break;
     case 83:
       socket.emit('move', 'down');
       ui.down.addClass(activeClass);
       break;
     case 68:
       socket.emit('move', 'right');
       ui.right.addClass(activeClass);
       break;
   }
 });

 //Al no oprimir una tecla envia el stop
 $(document).keyup(function(e){
   ui.all.removeClass(activeClass);
   socket.emit('stop');
   isPressed = false;
 });


/* Para dispositivos moviles */

 $( "#ButtonW" ).bind('touchstart', function() {
  socket.emit('move', 'up');
     ui.up.addClass(activeClass);
});

 $( "#ButtonW" ).bind('touchend', function() {
  ui.all.removeClass(activeClass);
   socket.emit('stop');
});

 $( "#ButtonA" ).bind('touchstart', function() {
  socket.emit('move', 'left');
     ui.left.addClass(activeClass);
});

 $( "#ButtonA" ).bind('touchend', function() {
  ui.all.removeClass(activeClass);
   socket.emit('stop');
});

 $( "#ButtonS" ).bind('touchstart', function() {
  socket.emit('move', 'down');
     ui.down.addClass(activeClass);
});

 $( "#ButtonS" ).bind('touchend', function() {
  ui.all.removeClass(activeClass);
   socket.emit('stop');
});

 $( "#ButtonD" ).bind('touchstart', function() {
  socket.emit('move', 'right');
     ui.right.addClass(activeClass);
});

 $( "#ButtonD" ).bind('touchend', function() {
  ui.all.removeClass(activeClass);
   socket.emit('stop');
});
/* Only touch */

});
