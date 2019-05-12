var LED_state;

window.onload = function () {
	//LED_state = 0;
	var ls = document.getElementById('ledState').innerHTML;
		ls = ls.split(/-->/).pop().trim();
		console.log(ls);
		LED_state = (ls == 'On');
		console.log(LED_state);
};
function toggleLED() {
	LED_state = !LED_state;
	console.log(LED_state);
	
	if(LED_state)
	{
		window.location.href = 'gpio?on=2';
	}
	else
	{
		window.location.href = 'gpio?off=2';
	}
};