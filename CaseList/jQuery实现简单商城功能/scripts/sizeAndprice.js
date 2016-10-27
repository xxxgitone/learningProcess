$(function(){
	$('.pro_size li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parents('ul').siblings('strong').text($(this).text());
	})

	var $span=$('.pro_price strong');
	var price=$span.text();

	$('#num_sort').change(function(){
		var num=$(this).val();
		var amount=num*price;
		$span.text(amount);
	}).change();
})