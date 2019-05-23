var lastFiveSun = [0,0,0,0,0,0,0,0,0,0];
						
var lenFiveSun = lastFiveSun.length;

var number;
														
var dataSun = {
	labels: ['1', '2', '3', '4', '5', '6', '7', '8','9', '10'],
	series: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
};

var options = {
	//width: 500,
	fullWidth: true,
	height: 350,
	low: 0,
	showPoint: false,
	showArea: true
};

var myChart2 = new Chartist.Line('.ct-chart2', dataSun, options);

setInterval(function(){
	number = Math.floor((Math.random() * 11));
	//console.log(number);												
	for (i = 0; i < lenFiveSun - 1; i++) {
		lastFiveSun[i] = lastFiveSun[i+1];
	}
	
	lastFiveSun[lenFiveSun - 1] = number;
	
	/* for (i = 0; i < lenFiveSun; i++) {
		console.log(lastFiveSun[i]);
	} */
	
	var newDataSun = {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
		series: [
			lastFiveSun
		]
	};
	
	myChart2.update(newDataSun);
	
}, 1000);