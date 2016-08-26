// Web Workers Main -- Tutorial 8/25/2016
// Created by Andrew V Butt Sr. aka Pryme8
// Pryme8.github.io - Pryme8@gmail.com
//STEP 1
window.onload = function() {
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