// Web Workers Main -- Tutorial 8/25/2016
// Created by Andrew V Butt Sr. aka Pryme8
// Pryme8.github.io - Pryme8@gmail.com
//STEP 3

//LETS SET UP OUR GAME ENTITES
						

SCALE = 1;
CENTERX = 0;
CENTERY = 0;

Entity = function(id, pos){ //pos is an array(3) with [x,y,angle];
      this.id = id;
      this.pos = pos;
	  this.velocity = [0,0,0]; // X,Y,ROTATION
	  this.mass = this.mass || 0;
	  
}

Entity.prototype.update = function(state) {
      this.pos = state.pos;     
}

Entity.prototype.draw = function(ctx) {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.pos[0]+CENTERX , this.pos[1]+CENTERY , 2*SCALE, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
}

Ball = function(id, pos) {
      Entity.call(this, id, pos);
	  this.body = {
		  type:'circle',
	  	  radius : 2*SCALE,	
	  }
	  this.mass = 1;
}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(ctx) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.pos[0]+CENTERX, this.pos[1]+CENTERY, SCALE, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();      
      Entity.prototype.draw.call(this, ctx);
}

player = function(id, pos) {
	 this.body = {
		  type:'box',
	  	  points : [
		  [-(10 * SCALE)*0.5, -SCALE*0.5], //TL
		  [(10 * SCALE)*0.5, -SCALE*0.5], //TR
		   [-(10 * SCALE)*0.5, SCALE*0.5], //BL
		  [(10 * SCALE)*0.5, SCALE*0.5] //BR
		  [-(10 * SCALE)*0.5, -SCALE*0.5], //TL close
		  ]	
	  }
	  this.mass = 0;
      Entity.call(this, id, pos);
}
    player.prototype = new Entity();
    player.prototype.constructor = player;
    
    player.prototype.draw = function(ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect((this.pos[0]+CENTERX)-((10 * SCALE)*0.5),
                   (window.innerHeight -20),
                   (10 * SCALE),
                   1 * SCALE);
}

pong = {
	ent_stack : [],
	gravity : [0,0.2],
	_init : null,
}


window.onload = function() {
	cvas = document.getElementById('cvas'); //Lets make it Global ^_^
	var ctx = cvas.getContext('2d');
	var score = document.getElementById('score');
	score.innerHTML = "Score: 0";
	pong.ent_stack.push(new Ball('b1', [0,0,0]));
	pong.ent_stack.push(new player('player1', [0, window.innerHeight - 20 ,0]));
	
	function resize(){
		cvas.setAttribute("width", window.innerWidth+'px');
		cvas.setAttribute("height", window.innerHeight+'px');
		SCALE = cvas.height / 40;
		CENTERX = cvas.width / 2;
		CENTERY = cvas.height / 2;
		reDraw();
		return	
	}
	
	function reDraw(){
		for(var i=0; i<pong.ent_stack.length; i++){
			pong.ent_stack[i].draw(ctx);
		}
	}
	
	resize();
	window.onresize = resize;
	
	
	if (window.Worker) {
		
		worker = new Worker("./js/worker1.js");
		worker.postMessage(['init', 0, pong.gravity]);

		
		function addObj(obj, stackID){
			worker.postMessage(['AddObj',
			{
				id : obj.id,
				body : obj.body,
				mass : obj.mass,
				intVel : obj.velocity,
				intPos : obj.pos,
				stackID : stackID,
				on : true				
			}
			]);
	
		}
		
				
		
		for(var i = 0; i < pong.ent_stack.length; i++){
			addObj(pong.ent_stack[i], i);	
		}
		
  			worker.onmessage = function(e) {
  				var result = e.data;
  				if(result[0]=='apply'){
					var calc = result[1];
					pong.ent_stack[calc.stackID].velocity = calc.newVel;
					pong.ent_stack[calc.stackID].pos = calc.newPos;
				}
			}
			
			pong._init = setInterval(function(){
      		ctx.clearRect(0, 0, cvas.width, cvas.height);
			reDraw();   
    		},1000/60);

	}else{
 		document.body.innerHTML = "Lame sauce... no Web Workers...";
	}
}