$(function(){
	var index=0;
	var adTimer=null;
	var $imgrolls=$('#jnImageroll div a');
	$imgrolls.css('opacity','0.7');
	var len=$imgrolls.length;
	$('#jnImageroll div a').mouseover(function(){
		index=$('#jnImageroll div a').index(this);
		showImg(index);
	}).eq(0).mouseover();//初始化

	$('#jnImageroll').hover(function(){
		if(adTimer){
			clearInterval(adTimer);
		}
	},function(){
		adTimer=setInterval(function(){
			showImg(index);
			index++;
			if(index==len){
				index=0;
			}
		},5000)
	}).trigger('mouseleave'); //触发第二个事件，因为hover包含mouseenter和mouseleave两个方法

	function showImg(index){
		var $rollobj=$('#jnImageroll');
		var $rolllist=$rollobj.find('div a');
		var newhref=$rolllist.eq(index).attr('href');
		$('#JS_imgWrap').attr('href',newhref)
						.find('img').eq(index).stop(true,true).fadeIn()
						.siblings().fadeOut();
		$rolllist.removeClass('chos').css('opacity','0.7')
				.eq(index).addClass('chos').css('opacity','1');
	}
})