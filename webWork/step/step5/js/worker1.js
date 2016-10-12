// Step 3
var engine = null; //Does not need to be global.
onmessage = function(e) {
var type = null;
  if(e.data.length){
  	type = e.data[0];
  }
	switch(type){
	case "init" :  engine = new physics(e.data);
	break;
	case "AddObj" : engine._addObject(e.data[1]);
	break;
	case "input-key-response" : engine._addInputResponse(e.data[1]);
	break;
	}
}

physics = function(data){
	console.log("TREAD "+data[1]+" STARTED!");
	this._core = data[1];
	this.gravity = data[2];
	this.stack = [];
	var parent = this;
	this.stage = data[3];
	this.inputs = [];
	this._init = setInterval(function(){parent._run()},1000/30);
}

physics.prototype._addInputResponse = function(kr){
	this.inputs.push(kr);
	console.log(this.inputs);
};

physics.prototype._run = function(){
	for(e=0; e<this.stack.length; e++){	
		if(!this.stack[e].on){continue}
		
		var tempCalc = this._calc(this.stack[e]);

		
		/*
		var hit = false;
		for(h=e+1; e< this.stack.length; h++){
		if(!this.stack[h].on){continue}
		if(hit){return}
			if(physics._hitTest(e,h)){
			
			}else{
			continue	
			}
		}
		*/
		this._apply(tempCalc, e);
		
	}
	

};

physics.prototype._addObject = function(obj){
	this.stack.push(obj);
	console.log("Thread "+this._core+": Added Obj - "+obj.id+" to its stack");
}


physics.prototype._hitTest = function(a,b){


return false;
}

physics.prototype._calc = function(obj){
		
	var response = {
		stackID : obj.stackID,
	};
	response.newVel = [
		obj.body.velocity[0] + (obj.body.mass * this.gravity[0]), //X
		obj.body.velocity[1] + (obj.body.mass * this.gravity[1]), //Y
	]
	response.newPos = [
		obj.pos[0] + response.newVel[0], //X
		obj.pos[1] + response.newVel[1], //Y
	]
	
	//console.log(response);
	return response;
}

physics.prototype._apply = function(calc, id){
	this.stack[id].pos = calc.newPos;
	this.stack[id].body.velocity = calc.newVel;
	postMessage(['apply',calc]);
}



