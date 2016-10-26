$(function(){
	$('#jnBrandList li').each(function(index){
		var $img=$(this).find('img');
		var img_w=$img.width();
		var img_h=$img.height();

		var spanHtml='<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'+img_h+'px;" class="imageMask"></span>'
		
		$(spanHtml).appendTo(this);

		$('#jnBrandList').on('mouseover','.imageMask',function(){
			$(this).toggleClass('imageOver');  //对设置或移除被选元素的一个或多个类进行切换。
		})
	})
})