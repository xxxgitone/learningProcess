//委托事件，用来减少应用事件监听数量
//在ul列表上做了事件委托
// list.addEventListener('click',function(e){
// 	if(e.currentTarget.tagName=='li'){
// 		/*...*/
// 		return false;
// 	}
// },false)


//Jquery实现
// $('ul li').click(function(){/*...*/});//不要这样

// $('ul').delegate('li','click',/*...*/);//推荐使用on方法

// //自定义事件
// //jQuery可以使用trigger来触发自定义函数

// //绑定自定义函数
// $('.class').bind('refresh.widget',function(){});

// //触发
// $('.class').trigger('refresh.widget');

// //参数
// $('.class').bind('refresh.widget',function(event,dataNumber){
// 	console.log(dataNumber);
// })
// $('.class').trigger('refresh.widget',5);

/*
//自定义事件和jQuery插件
jQuery.fn.tabs=function(control){
	var element=$(this);//
	control=$('control');
	//console.log(element); //ul#tabs
	//console.log(control);
	element.find('li').bind('click',function(){
		//从列表中删除或添加active
		element.find('li').removeClass('active');
		$(this).addClass('active');

		//给tabContent添加或删除active类
		var tabName=$(this).attr('data-tab');
		control.find(">[data-tab]").removeClass("active");
        control.find(">[data-tab='" + tabName + "']").addClass("active");
	})

	element.find('li:first').addClass('active');

	return this;
}

$(function(){
	$('ul#tabs').tabs('#tabContent');
})
*/

//DOM无关事件
//如何在应用中使用发布/订阅模式。只需记录回调和事件名称对应关系及调用他们的方法

var PubSub = {
	subscript: function(ev, callback) {
		//创建_callbacks对象，除非它已经存在
		var calls = this._callbacks || (this._callbacks = {});
		//针对给定的事件key创建一个数组，除非这个数组已经存在
		//然后将回调函数追加到这个数组中
		(this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);

		return this;
		
	},

	publish: function() {
		//将arguments对象转换成真正的数组
		var args = Array.prototype.slice.call(arguments, 0);

		//拿出第一个参数，即事件名称
		var ev = args.shift();

		//如果不存在_callbacks对象，则返回
		//或者如果不包含给定事件对应的数组
		var list, calls, i, l;
		if (!(calls = this._callbacks)) return this;
		if (!(list = this._callbacks[ev])) return this;
		//触发回调
		for (i = 0, l = list.length; i < l; i++)
			list[i].apply(this, args);

		return this;
	}
}

PubSub.subscript('wem', function() {
	alert('WEM!')
})

PubSub.publish('wem');

//可以使用命名空间
PubSub.subscript('uer:create', function() {
	/*...*/
})