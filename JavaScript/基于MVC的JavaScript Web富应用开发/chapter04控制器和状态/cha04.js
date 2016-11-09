//控制器和状态

//模块模式
//模块模式是用来封装逻辑并避免全局命名空间污染的好办法
//通常方法
(function(){
	/*...*/
})();

//全局导入
(function($){

})(jQuery)

//全局导出
(function($,exports){

	exports.Foo='wen';
})(jQuery,window)

//添加少量上下文
(function($){
	var mod={};

	mod.load=function(func){
		$($.proxy(func,this));
	};

	mod.load(function(){
		this.view=$('#view');
	});

	mod.assetsClick=function(e){
		//处理点击
	};

	mod.load(function(){
		this.view.find('.assets').click($.proxy(this.assetsClick,this));
	})


})(jQuery)

//抽象出库，这样就可以在别的模块和控制器重用它了
(function($,exports){
	var mod=function(includes){
		if(includes) this.include(includes);
	};
	mod.fn=mod.prototype;

	mod.fn.proxy=function(func){
		return $.proxy(func,this);
	}

	mod.fn.load=function(func){
		$(this.proxy(func));
	}

	mod.fn.include=function(od){
		$.extend(this,ob);
	}

	exports.Controller=mod;
})(jQuery,window)
