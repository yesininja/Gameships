//objetos de canvas
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

//crear objeto de la nave
	var nave = {
	x:400,
	y: canvas.height-100,
	width:50,
	height:50
}
//estados del juego
var juego = {
	estado: 'iniciando'
};
var teclado = {};
//array para disparos
var disparos = [];
//arreglo que almacena enemigos diabolicos malignos
var enemigos = [];
//variables para las imagenes
var fondo;

//definicion de las funsiones
function loadMedia(){
    fondo = new Image();
    fondo.src = 'space.jpg';
    fondo.onload = function(){
        var intervalo = window.setInterval(frameLoop,1000/55);
    }
    
}

function dibujarEnemigos(){
	for(var i in enemigos){
		var enemigo = enemigos[i];
		ctx.save();
		if(enemigo.estado == 'vivo')ctx.fillStyle = 'white';
		if(enemigo.estado == 'muerto')ctx.fillStyle = 'black';
		ctx.fillRect(enemigo.x,enemigo.y,enemigo.width,enemigo.height);
	}
}

function dibujarFondo(){
    ctx.drawImage(fondo,0,0);
}

function dibujarNave(){
ctx.save();
ctx.fillStyle= 'white';
ctx.fillRect(nave.x,nave.y,nave.width,nave.height);
ctx.restore();
}

function agregarEventosTeclado(){
	agregarEvento(document,"keydown",function(e){
		teclado[e.keyCode] = true;
		//console.log(e.keyCode);
	});
	
	agregarEvento(document,"keyup",function(e){
		teclado[e.keyCode] = false;
	});
	
function agregarEvento(elemento,nombreEvento,funcion){
	if(elemento.addEventListener)
	{
		elemento.addEventListener(nombreEvento,funcion,false);
		}
	
		else if(elemento.attachEvent){
		elemento.attachEvent(nombreEvento,funcion);
		}
	}
}
function moverNave(){
	if(teclado[37]){
		nave.x -= 6;
		if(nave.x <0) nave.x = 0;
	}
	if(teclado[39]){
		var limite = canvas.width - nave.width;
		nave.x += 6;
		if(nave.x > limite) nave.x = limite;
	}
	if(teclado[32]){
		if(!teclado.fire){//disparos variable booleana
			fire();//crea el disparo y lo agrega
			teclado.fire = true;
			//teclado[fire] = true;
		}
	}
	else teclado.fire = false;
}
function actualizaEnemigos(){
	if(juego.estado == 'iniciando'){
		for(var i =0;i<10;i++){
			enemigos.push({
				x: 10 + (i*50), //hace que tengan separacion entre enemigos
				y: 10,
				height: 40,
				width: 40,
				estado: 'vivo'
			});
		}
		juego.estado == 'jugando';//verifica que solo una vez entre al ciclo iniciando
	} 
}
function moverDisparos(){
	for(var i in disparos){
		var disparo = disparos[i];
		disparo.y -= 2;//se mueve el disparo en su coordenada
		
	}
	disparos = disparos.filter(function (disparo){//funcion filter devuelve un arreglo que cumpla con cierta condicion que se coloca en una funcion
		return disparo.y > 0;//este filtro elimina los disparos que pasan del canvas en la coordenada 0 para consumir menos memoria
	});
}

function fire(){
	disparos.push({
	//posicion inicial es la pocsicion actual de la nave
		x: nave.x + 20,
		y: nave.y - 10,//para que salga un poco mas arriba
		width: 10,
		height: 30
		
	});
}
function dibujarDisparos(){
	ctx.save();
	ctx.fillStyle= 'white';
	for(var i in disparos){//se crea un cicli for i que permite dibujar los disparos
		var disparo = disparos[i];
		ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
	}
	ctx.restore();
}

function frameLoop(){
	moverNave();
	actualizaEnemigos;
	moverDisparos();
    dibujarFondo();
	dibujarEnemigos();
	dibujarDisparos();
	dibujarNave();
}

//ejecucion de las funciones
agregarEventosTeclado();
loadMedia();

