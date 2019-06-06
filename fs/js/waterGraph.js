var lastFive = [0,0,0,0,0,0];
var lastFiveDates = ["Date","Date","Date","Date","Date",""];						
var lenFive = lastFive.length;
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

//Websocket stuff
var ws;
var retries;

window.onload = function() {
	console.log(currentDT);
	wsOpen();
	startPolling();
}

function startPolling() {
	setInterval(function() { wsWrite('A'); }, 500);
}

function onMessage(evt) {
	retries = 0;
	var dv = new DataView(evt.data);
	var val = dv.getUint16(0);
	if (val == 0xBEEF || val == 0xDEAD)
		console.log("LED switched");
	else
		console.log("ADC Value: " + val);
}

function wsOpen() {
	if (ws === undefined || ws.readyState != 0) {
		if (retries)
			console.log("error", "WebSocket timeout, retrying..");
		else
			console.log("info", "Opening WebSocket..");
		ws = new WebSocket("ws://" + location.host);
		ws.binaryType = 'arraybuffer';
		ws.onopen = function(evt) { retries = 0; console.log("done", "WebSocket is open."); };
		ws.onerror = function(evt) { console.log("error", "WebSocket error!"); };
		ws.onmessage = function(evt) { onMessage(evt); };
		wsOpenStream();
		retries = 0;
	}
}
function wsOpenStream() {
	var uri = "/stream"
	var ws = new WebSocket("ws://" + location.host + uri);
	ws.onmessage = function(evt) {
		console.log(evt.data);
		var stats = JSON.parse(evt.data);
		console.log(stats);
	};
}

function wsWrite(data) {
	if (ws.readyState == 3 || retries++ > 5)
		wsOpen();
	else if (ws.readyState == 1)
		ws.send(data);
}
														
var data = {
	labels: ['1', '2', '3', '4', '5','6'],
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

var myChart = new Chartist.Line('.ct-chart', data, options);

setInterval(function(){
	number = Math.floor((Math.random() * 11));
	currentDT = retrieveDateTime();
	//console.log(number);												
	for (i = 0; i < lenFive - 1; i++) {
		lastFive[i] = lastFive[i+1];
		//lastFiveDates[i] = lastFiveDates[i+1];		
	}
	
	for (i = 0; i < lenFive - 2; i++) {
		lastFiveDates[i] = lastFiveDates[i+1];		
	}
	
	lastFive[lenFive - 1] = number;
	lastFiveDates[lenFive - 2] = currentDT;
	lastFiveDates[lenFive - 1] = "";
	
	/* for (i = 0; i < lenFive; i++) {
		console.log(lastFive[i]);
	} */
	
	var newData = {
		//labels: ['1', '2', '3', '4', '5'],
		labels: lastFiveDates,
		series:	[
		lastFive
		]
	};
	
	myChart.update(newData);
		
}, 1000);