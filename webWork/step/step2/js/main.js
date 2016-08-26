// Web Workers Main -- Tutorial 8/25/2016
// Created by Andrew V Butt Sr. aka Pryme8
// Pryme8.github.io - Pryme8@gmail.com
//STEP 2
window.onload = function() {
	cvas = document.getElementById('cvas'); //Lets make it Global ^_^
	var context = cvas.getContext('2d');
	var score = document.getElementById('score');
	score.innerHTML = "Score: 0";
	function resize(){
		cvas.setAttribute("width", window.innerWidth+'px');
		cvas.setAttribute("height", window.innerHeight+'px');
		drawBall();
		drawPlayer();
		return	
	}
	resize();
	window.onresize = resize;
	
	
	//Lets just Draw our ball for now and paddles for now.
	  function drawBall(){      
      var centerX = cvas.width / 2;
      var centerY = cvas.height / 2;
      var radius = cvas.height / 40;
	  context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'blue';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'blue';
      context.stroke();
	  }
	  
	  function drawPlayer(){      
      var centerX = cvas.width / 2;
      var centerY = cvas.height - 20;
      var width = cvas.width / 10;
	  var height = 10;
      context.fillStyle = 'red';
      context.fillRect(centerX - (width*0.5) ,centerY,width,height); 
	  }
	
	
	if (window.Worker) {
 		var newWorker = new Worker("./js/worker1.js");
		
  			newWorker.postMessage([1,"Two"]);
  			console.log('Message posted...');
			
			newWorker.onmessage = function(e) {
  				result = e.data;
  				console.log(result);
			}

	}else{
 		document.body.innerHTML = "Lame sauce... no Web Workers...";
	}
}