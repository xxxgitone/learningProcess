$(function(){
	$('.color_change ul li img').click(function(){
		$(this).addClass('hover').parent().siblings().find('img').removeClass('hover');
		var imgSrc=$(this).attr('src');
		var i=imgSrc.lastIndexOf('.');
		var unit=imgSrc.substring(i);
		imgSrc=imgSrc.substring(0,i);
		var imgSrc_small=imgSrc+'_one_small'+unit;
		var imgSrc_big=imgSrc+'_one_big'+unit;
		$('#bigImg').attr({'src':imgSrc_small});
		$('#thickImg').attr('src',imgSrc_big);

		var alt=$(this).attr('alt');
		$('.color_change strong').text(alt);

		var newImgSrc=imgSrc.replace('images/pro_img/','');
		$('#jnProitem .imgList li').hide();
		$('#jnProitem .imgList').find('.imgList_'+newImgSrc).show();

		$('#jnProitem .imgList').find('.imgList_'+newImgSrc).eq(0).find('a').click();//触发获取元素的单击事件
	})
})