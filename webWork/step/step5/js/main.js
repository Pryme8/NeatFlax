// Web Workers Main -- Tutorial 8/25/2016
// Created by Andrew V Butt Sr. aka Pryme8
// Pryme8.github.io - Pryme8@gmail.com
//STEP 3

//LETS SET UP OUR GAME ENTITES
						

SCALE = 1;
CENTERX = 0;
CENTERY = 0;

Entity = function(id, pos){ //pos is an array(3) with [x,y];
      this.id = id;
      this.pos = pos || [0,0];
	  this.body = this.body || {};
	  this.body.rotation = 0;
	  this.body.velocity = [0,0];
	  this.body.mass = this.mass || 0;	  
}

Entity.prototype.update = function(state) {
      this.pos = state.pos;     
}

CIRCLE = function(id, pos, args) {
     
	  this.args = args || {};
	  this.args.radius = this.args.radius || 2;
	  this.args.mass = this.args.mass || 0;
	  this.args.on = this.args.on || false;
	  
	  this.body = {
		  type:'circle',
	  	  radius : this.args.radius*SCALE,
		  mass : this.args.mass,
		  on : this.args.on,
	  }
	  
	   Entity.call(this, id, pos);
	  
}

CIRCLE.prototype = new Entity();
CIRCLE.prototype.constructor = CIRCLE;

CIRCLE.prototype.draw = function(ctx) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.pos[0]+CENTERX, this.pos[1]+CENTERY, SCALE, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();      
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.pos[0]+CENTERX, this.pos[1]+CENTERY, 1, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();      
}

BOX = function(id, pos, args) {
	  this.args = args || {};
	  this.args.width = this.args.width || 10;
	  this.args.height = this.args.height || 10;
	  this.args.mass = this.args.mass || 0;
	  this.args.on = this.args.on || false;
	  this.args.color = this.args.color || 'black';
	  
	 	this.body = {
		  type:'box',
	  	  points : [],
		  mass : this.args.mass,
		  on : this.args.on,
	  }
	  
      Entity.call(this, id, pos);
}
    BOX.prototype = new Entity();
    BOX.prototype.constructor = BOX;
    
    BOX.prototype.draw = function(ctx) {
      ctx.fillStyle = this.args.color;
      ctx.fillRect(CENTERX + this.pos[0] - ((this.args.width*SCALE)*0.5),
                   CENTERY + this.pos[1] - ((this.args.height*SCALE)*0.5),
                   this.args.width*SCALE,
                   this.args.height*SCALE);
}

pong = {
	ent_stack : [],
	gravity : [0,0.2],
	_init : null,
}

INPUT = function(parent, type, worker){
	this.parent = parent;
	this.worker = worker;
	var self = this;
	if(type == 'keyboard'){
		self.keys = {};
		document.addEventListener('keydown', function(e) {
			if(typeof self.keys[e.key] == 'undefined'){
				eval('self.keys.'+e.key+' = true;');
			}
			self.keys[e.key] = true;
			
    	}, false);
		
		document.addEventListener('keyup', function(e) {
			self.keys[e.key] = false;
			console.log(self.keys);
    	}, false);
	}
};

INPUT.prototype._addKeyResponse = function(key, response){
	var repo = {key:key, response:response};
	this.worker.postMessage(['input-key-response', repo]);
}


window.onload = function() {
	cvas = document.getElementById('cvas');
	var ctx = cvas.getContext('2d');
	var score = document.getElementById('score');
	score.innerHTML = "Score: 0";
	//pong.ent_stack.push(new Ball('b1', [0,0,0]));
	
	
	function resize(){
		cvas.setAttribute("width", window.innerWidth+'px');
		cvas.setAttribute("height", window.innerHeight+'px');
		if(typeof worker !== 'undefined'){
		
		}
		SCALE = cvas.height / 40;
		CENTERX = cvas.width / 2;
		CENTERY = cvas.height / 2;
		if(pong.ent_stack.length){
		reDraw();
		}
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
		worker.postMessage(['init', 0, pong.gravity, {CENTERX:CENTERX, CENTERY:CENTERY, SCALE:SCALE}]);

		pong.ent_stack.push(new BOX('player1', [0, (CENTERY)-60], {width:10, height:2, mass:0, on:true, color:'red'}));
		var controler = new INPUT(pong.ent_stack[0], 'keyboard', worker);
		controler._addKeyResponse('d', function(){
			worker.postMessage(['apply-impluse', {target:0, vec:[1,0]}]);
		});
		
		reDraw();

		
		function addObj(obj, stackID){
			worker.postMessage(['AddObj',
			{
				id : obj.id,
				body : obj.body,
				pos : obj.pos,
				rotation: obj.rotation,
				stackID : stackID				
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