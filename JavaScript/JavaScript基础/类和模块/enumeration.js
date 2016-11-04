/**
 * 通过原型继承创建一个新对象，使用ECMAScript5中的Object.create方法
 * 如果不支持，则退化使用其他方法
 * @param  {Object} p 将要继承的对象
 * @return Object   继承自原型对象p的属性的新对象
 */
function inherit(p) {
	if (p == null) throw TypeError(); //p是一个对象，但不能为null
	if (Object.create) //是否支持Object.create
		return Object.create(p);
	var t = typeof p;
	if (t !== 'Object' && t !== 'function') throw TypeError();

	function f() {}; //定义一个空函数
	f.prototype = p; //将其原型属性设置为p
	return new f(); //使用f()创建p的继承对象
}

//这里创建一个新的枚举类型，实参对象表示类的每个实例的名字和值,只可读，原生没有实现这个方法
//返回值是一个构造函数，它标识这个新类
//注意这个构造函数也会抛出异常，不能使用它来创建该类型的新实例
//返回的构造函数包含名/值对的映射表
//包括由值组成的数组，以及一个foreach的迭代器
function enumeration(namesToValues) {
	//这个虚拟的构造函数时返回值
	var enumeration=function(){
		throw "Can't Instantiate Enumerations"
	};

	//枚举值继承自这个对象
	var proto=enumeration.prototype={
		constructor:enumeration, //标识类型
		toString:function(){//返回名字
			return this.name;
		},
		valueOf:function(){//返回值
			return this.value;
		},
		toJSON:function(){//转化为json
			return this.name;
		}
	};

	enumeration.values=[];  //用以存放枚举对象的数组

	for(name in namesToValues){ //遍历每个值
		var e=inherit(proto); //创建一个代表它的对象
		e.name=name;//给它一个名字
		e.value=namesToValues[name];//给它一个值

		enumeration[name]=e;//将它设置为构造函数的属性
		enumeration.values.push(e);//将它存储到值数组中
	}

	//一个类方法，用以对类的实例进行迭代
	enumeration.foreach=function(f,c){
		for(var i=0;i<this.values.length;i++)
			f.call(c,this.values[i]);
	}
	//返回标识这个新类型的构造函数
	return enumeration;
}

//实现
// var Coin=enumeration({Penny:1,Nickel:5,Dimo:10,Quarter:25});
// var c=Coin.Dimo;
// console.log(c);   //{name="Dimo",value=10,constructor=function(),toJSON=function()....}
// console.log(c instanceof Coin);
// console.log(Coin.Quarter+3*Coin.Nickel); //40:将值装换为数字
//console.log(Coin.Dimo==10);

//使用枚举类型来标识一副扑克牌

function Card(suit,rank){
	this.suit=suit; //花色
	this.rank=rank;//点数
}

Card.Suit=enumeration({Clubs:1,Diamonds:2,Hearts:3,Spades:4});
Card.Rank=enumeration({
	Two:2,
	Three:3,
	Four:4,
	Five:5,
	Six:6,
	Seven:7,
	Eight:8,
	Nine:9,
	Ten:10,
	Jack:11,
	Queen:12,
	king:13,
	Ace:14
});

//定义用以描述牌面的文本
Card.prototype.toString = function() {
	return this.rank.toString()+' of '+this.suit.toString();
};

//比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that) {
	if(this.rank<that.rank) return -1;
	if(this.rank>than.rank) return 1;
	return 0;
};

//以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank=function(a,b){
	return a.compareTo(b);
}

//以桥牌的玩法规则对扑克牌进行排序的函数
Card.orderBySuit=function(a,b){
	if(a.suit<b.suit) return -1;
	if(a.suit>b.suit) return 1;
	if(a.rank<b.rank) return -1;
	if(a.rank>b.rank) return 1;
	return 0;
}

//定义一副标准的扑克牌
function Deck(){
	var cards=this.cards=[];  //一副牌就是由牌组成的数组
	Card.Suit.foreach(function(s){//初始化这个数组
		Card.Rank.foreach(function(r){
			cards.push(new Card(s,r));
		})
	})
}

//洗牌的方式：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function() {
	//遍历数组中的每个元素，随机找出牌面最小的元素，并与之（当前遍历的元素）交换
	var deck=this.cards,len=deck.length;
	for(var i=len-1;i>0;i--){
		var r=Math.floor(Math.random()*(i+1)),temp;  //随机数
		temp=deck[i],deck[i]=deck[r],deck[r]=temp;//交换
	}
	return this;
};

//发牌的方式：返回牌的数组
Deck.prototype.deal = function(n) {
	if(this.cards.length<n) throw 'Out of Card';
	return this.cards.splice(this.cards.length-n,n);
};

//创建衣服新的扑克牌，洗牌并发牌
var deck=(new Deck()).shuffle();
var hand=deck.deal(13).sort(Card.orderBySuit);
//console.log(hand);

