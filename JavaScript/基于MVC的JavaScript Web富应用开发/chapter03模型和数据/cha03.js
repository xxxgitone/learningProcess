//模型和数据

//1.MVC和命名空间
//要确保引用中的视图、状态和数据彼此清晰分离，这样才能让架构更加整洁有序且更加健壮
//引入MVC模式，数据管理则归入模型(MVC的M)。模型应当从视图和控制器解耦出来
//与数据操作和行为相关的逻辑应当放入模型中，通过命名空间进行管理

//通过给对象添加属性来管理一个命名空间，这个命名空间可以是变量，也可以是函数

// var User = {
// 	records: { /*....*/ }
// }

//User的数组数据就在命名空间User.records中。和User相关的函数也可以放入User中
//比如：使用fecthRemote函数来从服务器获取user数据
// var User = {
// 	records: [],
// 	fetchRemote: function() { /*....*/ },
// }

//将那些在真实user对象上的user实例相关的函数也添加进去。假设user记录包含一个destroy函数
//它是和具体的user相关的，因此这个函数应当基于User实例进行调用

//var user = new User();
//user.destroy();

//为了做到这一点，应当将User写成一个类，而不是一个简单的对象
// var User = function(attr) {
// 	this.attributes = attr || {};
// }
// User.prototype.destroy = function() {
// 	// body...
// };

// //对于那些和具体的user不相关的函数和变量，则可直接定义在User对象中
// User.fetchRemote = function() {
// 	//.....
// }

//构建对象关系映射（ORM）
//本质上讲，ORM是一个包装了一些数据的对象层

//2.原型继承
//使用Object.create来构造我们的ORM
//可以模拟出

if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		function F() {};
		F.prototype = o;
		return new F();
	}
}

//创建Module对象,这个对象将用于创建新模型和实例
var Model = {
		inherited: function() {},
		created: function() {},

		prototype: {
			init: function() {},
		},

		create: function() {
			var object = Object.create(this);
			object.parent = this;
			object.prototype = object.fn = Object.create(this.prototype);

			object.created();
			this.inherited(object);
			return object;
		},

		init: function() {
			var instance = Object.create(this.prototype);
			instance.parent = this;
			instance.init.apply(instance, arguments);
			return instance;
		}
	}
	//create返回一个新对象，这个对象继承自Module对象，只用它来创建新模型
	//init函数返回一个新对象，它继承Module.prototype

var Asset = Model.create();
//var User = Model.create();

//var use = User.init();

//3.添加ORM属性

//添加对象属性
jQuery.extend(Model, {
	find: function() {}
})

//添加实例属性
jQuery.extend(Model.prototype, {
		init: function(attr) {
			if (attr) this.load(attr);
		},
		load: function(attributes) {
			for (var name in attributes)
				this[name] = arguments[name];
		}
	})
	//jQuery.extend只是代替了for循环手动复制的一种快捷方式，和这里的load方法差不多
	//现在我们的对象和实例属性都传播到了单独的模型里

//将extend和incl添加到Model中
var Model = {
		inherited: function() {},
		created: function() {},

		prototype: {
			init: function() {},
		},

		create: function() {
			var object = Object.create(this);
			object.parent = this;
			object.prototype = object.fn = Object.create(this.prototype);

			object.created();
			this.inherited(object);
			return object;
		},

		init: function() {
			var instance = Object.create(this.prototype);
			instance.parent = this;
			instance.init.apply(instance, arguments);
			return instance;
		},

		extend: function(o) {
			var extended = o.extended;
			jQuery.extend(this, o);
			if (extended) extended(this);
		},

		include: function(o) {
			var included = o.included;
			jQuery.extend(this.prototype, o);
			if (included) included(this);
		}
	}
	//添加对象属性
	// Model.extend({
	// 	find: function() {},
	// });

//添加实例方法
// Model.include({
// 	init: function(atts) {},
// 	load: function(attributes) {}
// });

//可以创建新的资源并设置一些属性
//var asset=Asset.init({name:'.png'});

//4.持久化记录

//用来保存资源的对象
Model.records = {}

Model.include({
	newRecord: true,

	create: function() {
		this.newRecord = false;
		this.parent.records[this.id] == this;
	},

	destroy: function() {
		delete this.parent.records[this.id];
	},

	update: function() {
		this.parent.records[this.id] = this;
	},

	//将对象存入hash记录中，保持一个引用指向它
	save: function() {
		this.newRecord ? this.create() : this.update();
	}
})

//添加对象属性,查找
Model.extend({
	find: function(id) {
		alert(id);
		return this.records[id] ||
			throw ('Unknown record');
	},
});

var asset = Asset.init();
asset.name = 'same';
asset.id = 1;
asset.save();

assertEqual(Asset.find(1), 'same');

