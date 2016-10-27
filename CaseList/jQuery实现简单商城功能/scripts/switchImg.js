$(function(){
	$('#jnProitem ul.imgList li a').on('click',function(){
		var imgSrc=$(this).find('img').attr('src');
		var i=imgSrc.lastIndexOf('.');
		var unit=imgSrc.substring(i);   //substring接受两个参数，后面是终止位置，为可选参数不可为负数。这里截取i位置后的
		imgSrc=imgSrc.substring(0,i);  //这里截取0到i
		var imgSrc_big=imgSrc+'_big'+unit;
		$('#thickImg').attr('href',imgSrc_big);
	})
})