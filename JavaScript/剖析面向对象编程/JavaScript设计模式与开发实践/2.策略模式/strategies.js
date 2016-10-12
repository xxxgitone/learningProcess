
//策略模式：定义一系列算法，把他们一个个封装起来，并且使他们可以相互替换

//使用策略模式计算奖金

/*
//最初的代码实现，缺点：1.函数比较庞大 2.函数缺乏弹性 3.复用性差
var calculateBonus=function(performanceLevel,salary){
	if(performanceLevel=='S'){
		return salary*4;
	}
	if(performanceLevel=='A'){
		return salary*3;
	}
	if(performanceLevel=='B'){
		return salary*2;
	}
}

alert(calculateBonus('B',20000));
alert(calculateBonus('S',6000));
*/

/*
//组合函数重构代码，将算法封装到一个个小函数里:代码数更加庞大，仍然缺乏弹性

var performanceS=function(salary){
	return salary*4;
}

var performanceA=function(salary){
	return salary*3;
}

var performanceB=function(salary){
	return salary*2;
}

var calculateBonus=function(performanceLevel,salary){
	if(performanceLevel=='S'){
		return performanceS(salary);
	}
	if(performanceLevel=='A'){
		return performanceA(salary);
	}
	if(performanceLevel=='B'){
		return performanceB(salary);
	}
}
alert(calculateBonus('A',6000));
*/

/*
//使用策略模式重构代码:基于传统面向对象语言的模仿

var performanceS=function(){};
performanceS.prototype.calculate=function(salary){
	return salary*4;
}

var performanceA=function(){};
performanceA.prototype.calculate=function(salary){
	return salary*3;
}

var performanceB=function(){};
performanceB.prototype.calculate=function(salary){
	return salary*2;
}

   //定义奖金类
var Bonus=function(){
	this.salary=null; //原始工资
	this.strategy=null; //绩效等级对应的策略对象
}
Bonus.prototype.setSalary=function(salary){
	this.salary=salary;
}
Bonus.prototype.setStrategy=function(strategy){
	this.strategy=strategy;
}
Bonus.prototype.getBonus=function(){
	return this.strategy.calculate(this.salary);
}

//调用
var bonus=new Bonus();

bonus.setSalary(10000);
bonus.setStrategy(new performanceS());

console.log(bonus.getBonus());

*/

/*
//JavaScript版本的策略模式
var strategies={
	'S':function(salary){
		return salary*4;
	},
	'A':function(salary){
		return salary*3;
	},
	'B':function(salary){
		return salary*3;
	}
}

var calculateBonus=function(level,salary){
	return strategies[level](salary);
}

console.log(calculateBonus('S',20000));

*/

/*
//使用策略模式实现缓冲动画

//1.缓动算法  参数含义 ：动画已经消耗的时间，小球原始位置，小球目标位置，动画持续的总时间
var tween={
	linear:function(t,b,c,d){
		return c*t/d+b;
	},
	easeIn:function(t,b,c,d){
		return c*(t/=d)*t+b;
	},
	strongEaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t*t*t+b;
	},
	strongEaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t+1)+b;
	},
	sineaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t+b;
	},
	sineaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t+1)+b;
	}
}

//2.定义Animate类
var Animate=function(dom){
	this.dom=dom;       //进行运动的dom节点
	this.startTime=0;    //动画开始时间
	this.startPos=0;	//动画开始时，dom节点的位置，即dom的初始位置
	this.endPos=0;		//动画结束时，DOM节点的位置，即dom的目标位置
	this.propertyName=null;		//dom节点需要改变的css属性名
	this.easing=null;		//缓动算法
	this.duration=null;		//动画持续时间
}
//3.start方法，负责启动这个动画
Animate.prototype.start=function(propertyName,endPos,duration,easing){
	this.startTime=+new Date();  //动画启动时间
	this.startPos=this.dom.getBoundingClientRect()[propertyName];   //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
	this.propertyName=propertyName;
	this.endPos=endPos;
	this.easing=tween[easing];
	this.duration=duration;
	
	var self=this;
	
	var timeId=setInterval(function(){
		if(self.step()==false){
			clearInterval(timeId);
		}
	},19);
}
//3.代表小球运动每一帧要做的事情
Animate.prototype.step=function(){
	var t=+new Date();   //取得当前时间
	if(t>=this.startTime+this.duration){ //当当前时间大于起始时间加上运动时间，说明动画结束，
		this.update(this.endPos);  //手动让他等于重点位置
		return false;
	}
	var pos=this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);
	
	this.update(pos);
}
//4.更新小球位置
Animate.prototype.update=function(pos){
	this.dom.style[this.propertyName]=pos+'px';
}

var div=document.getElementById('div');
var animate=new Animate(div);
animate.start('left',500,1000,'sineaseOut');
*/

//更广义的“算法”   表单验证
//用户名不能为空  密码长度不能少于6位 手机号码必须符合格式

/*
//常见版

var registerForm=document.getElementById('registerForm');

registerForm.onsubmit=function(){
	if(registerForm.userName.value==''){
		alert('用户名不能为空');
		return false;
	}
	if(registerForm.passWord.value<=6){
		alert('密码长度不能少于6位');
		return false;
	}
	if(!/^1[3|5}8][0-9]{9}$/.test(registerForm.phoneNumber.value)){
		alert('手机号码必须符合格式');
		return false;
	}
}

*/

/*
//用策略模式构建
var strategies={
	isNonEmpty:function(value,errorMsg){
		if(value===''){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length<=length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/^1[3|5}8][0-9]{9}$/.test(value)){
			return errorMsg;
		}
	}
};

//validator类的实现
var Validator=function(){
	this.cache=[];  //保存校验规则
}

Validator.prototype.add=function(dom,rule,errorMsg){
	var ary=rule.split(':');     //将strategy和参数分开  'minLength:6'
	this.cache.push(function(){     //把校验的步骤用空函数包装起来，并且放入cache
		var strategy=ary.shift();	//shift删除并返回第一个元素  用户挑选的strategy
		ary.unshift(dom.value);		//unshift在数组头部添加一个元素  把input的value添加进参数列表
		ary.push(errorMsg);		//将errorMsg添加进参数列表
		return strategies[strategy].apply(dom,ary);      //闭包里面的this指向window
	})
}

Validator.prototype.start=function(){
	for(var i=0,validatorFunc;validatorFunc=this.cache[i++];){
		var msg=validatorFunc(); //开始校正，并取得校验后的返回信息
		if(msg){ //如果有返回值，说明校验没有成功
			return msg;
		}
	}
}

//方法调用
var validataFunc=function(){
	var validator=new Validator();
	
	validator.add(registerForm.userName,'isNonEmpty','用户名不能为空');
	validator.add(registerForm.passWord,'minLength:6','密码长度不能少于6位');
	validator.add(registerForm.phoneNumber,'isMobile','手机号码必须符合格式');
	
	var errorMsg=validator.start();  //获得校验结果
	
	return errorMsg;	 //返回
}

var registerForm=document.getElementById('registerForm');
registerForm.onsubmit=function(){
	var errorMsg=validataFunc();  //如果有返回值，说明校验没有成功
	if(errorMsg){
		alert(errorMsg);
		return false; //阻止表单提交
	}
}
*/

//实现给文本框添加多种验证规则

/* ********策略对象*********** */
var strategies={
	isNonEmpty:function(value,errorMsg){
		if(value===''){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length<=length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/^1[3|5}8][0-9]{9}$/.test(value)){
			return errorMsg;
		}
	}
};

/* ********validator类*********** */
var Validator=function(){
	this.cache=[];  //保存校验规则
}

Validator.prototype.add=function(dom,rules){
	var self=this;
	for(var i=0,rule;rule=rules[i++];){
		(function(rule){
			var strategyAry=rule.strategy.split(':');
			var errorMsg=rule.errorMsg;
			
			self.cache.push(function(){
				var strategy=strategyAry.shift();
				strategyAry.unshift(dom.value);
				strategyAry.push(errorMsg);
				return strategies[strategy].apply(dom,strategyAry);
			});
		})(rule);
	}
	
}

Validator.prototype.start=function(){
	for(var i=0,validatorFunc;validatorFunc=this.cache[i++];){
		var msg=validatorFunc(); //开始校正，并取得校验后的返回信息
		if(msg){ //如果有返回值，说明校验没有成功
			return msg;
		}
	}
}

/* ********客户调用代码*********** */
var validataFunc=function(){
	var validator=new Validator();
	
	validator.add(registerForm.userName,[{
		strategy:'isNonEmpty',
		errorMsg:'用户名不能为空'
	},{
		strategy:'minLength:6',
		errorMsg:'用户名长度不能小于6位'
	}]);
	
	validator.add(registerForm.passWord,[{
		strategy:'isNonEmpty',
		errorMsg:'请输入密码'
	},{
		strategy:'minLength:6',
		errorMsg:'密码长度不能小于6位'
	}]);
	
	validator.add(registerForm.phoneNumber,[{
		strategy:'isMobile',
		errorMsg:'手机号码必须符合格式'
	}])
	
	var errorMsg=validator.start();  //获得校验结果
	
	return errorMsg;	 //返回
}

var registerForm=document.getElementById('registerForm');
registerForm.onsubmit=function(){
	var errorMsg=validataFunc();  //如果有返回值，说明校验没有成功
	if(errorMsg){
		alert(errorMsg);
		return false; //阻止表单提交
	}
}


