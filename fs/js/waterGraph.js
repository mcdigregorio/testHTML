var lastFive = [0,0,0,0,0,0,0,0,0,0];
						
var lenFive = lastFive.length;

var number;
														
var data = {
	labels: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8','#9', '#10'],
	series: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
};

var options = {
	//width: 500,
	height: 350,
	low: 0,
	showArea: true
};

var myChart = new Chartist.Line('.ct-chart', data, options);

setInterval(function(){
	number = Math.floor((Math.random() * 11));
	//console.log(number);												
	for (i = 0; i < lenFive - 1; i++) {
		lastFive[i] = lastFive[i+1];
	}
	
	lastFive[lenFive - 1] = number;
	
	for (i = 0; i < lenFive; i++) {
		console.log(lastFive[i]);
	}
	
	var newData = {
		labels: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10'],
		series: [
			lastFive
		]
	};
	
	myChart.update(newData);
	
}, 1000);