// Step 3
newGame = null;
onmessage = function(e) {
	console.log('Recived Message!');
var type = null;
  if(e.data.length){
  	type = e.data[0];
  }
	switch(type){
	case "init" : newGame = new pong(e.data[1]);
	break;
	}
}

pong = function(){

	this.ballPos = [0,0];
	this.ballSpeed = [0,0];
	this.ballSpin = 0;
	this.ballBouncy = 1.01;
	this.playerSpeed = 0;
	this.playerPos = 0;
	this.cameraTarget = [0,0];
		
	this.fps = 30;	
	this.currentFPS = 0;
	this.lastFrame = null;
	
	this.Const = {
		ballMaxSpeed : 4,
		ballMaxSpin : 4,
		ballHitBox : null,
		gravity : 0.1,
		playerMaxSpeed : 3.5,
		playerHitBox : null,
		playerAccel: 0.1,		
		};
	this.score = 0;
		
};




