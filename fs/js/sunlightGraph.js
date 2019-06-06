var lastFiveSun = [0,0,0,0,0,0];
var lastFiveDates = ["Date","Date","Date","Date","Date",""];						
var lenFiveSun = lastFiveSun.length;
var number;
var currentDT;

function retrieveDateTime()
{
	var currentDate = new Date();

	var date = currentDate.getDate();
	var month = currentDate.getMonth();
	var year = currentDate.getFullYear();
	var hour = currentDate.getHours();
	var minute = currentDate.getMinutes();

	if (hour > 12)
	{
		hour -= 12;
		minute = currentDate.getMinutes() + " PM";
	}
	else
	{
		minute = currentDate.getMinutes() + " AM";
	}

	if (currentDate.getMinutes() < 10)
	{
		minute = "0" + minute;
	}

	var dateString = (month+1) + "-" + date + "-" + year;
	var timeStamp = hour + ":" + minute;
	var DT = dateString + "\n" + timeStamp;
	
	return DT;
}

currentDT = retrieveDateTime();
														
var dataSun = {
	labels: ['1', '2', '3', '4', '5', '6'],
	series: [
		[0, 0, 0, 0, 0, 0]
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
	currentDT = retrieveDateTime();
	//console.log(number);												
	for (i = 0; i < lenFiveSun - 1; i++) {
		lastFiveSun[i] = lastFiveSun[i+1];
	}
	
	for (i = 0; i < lenFiveSun - 2; i++) {
		lastFiveDates[i] = lastFiveDates[i+1];		
	}
	
	lastFiveSun[lenFiveSun - 1] = number;
	lastFiveDates[lenFiveSun - 2] = currentDT;
	lastFiveDates[lenFiveSun - 1] = "";
	
	/* for (i = 0; i < lenFiveSun; i++) {
		console.log(lastFiveSun[i]);
	} */
	
	var newDataSun = {
		labels: lastFiveDates,
		series: [
			lastFiveSun
		]
	};
	
	myChart2.update(newDataSun);
	
}, 1000);