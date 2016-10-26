$(function(){
	var x=20;
	var y=10;
	$('a.tooltip').mouseover(function(e){
		this.myTitle=this.title;
		this.title='';
		var tooltip='<div id="tooltip">'+this.myTitle+'</div>';
		$('body').append(tooltip);
		$('#tooltip').css({
			'top':(e.pageY+y)+'px',
			'left':(e.pageX+x)+'px',
		}).show('fast');
	}).mouseout(function(){
		this.title=this.myTitle;
		$('#tooltip').remove();
	}).mousemove(function(e){
		$('#tooltip').css({
			'top':(e.pageY+y)+'px',
			'left':(e.pageX+x)+'px',
		})
	})
})