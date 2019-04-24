var waterHeight;
setInterval(function(){
	waterHeight = Math.floor((Math.random() * 101));
	//console.log(waterHeight);
	
	$(function(){
		$('.water').animate({
			height: waterHeight + '%'
		}, 1000)
	})
}, 2000);