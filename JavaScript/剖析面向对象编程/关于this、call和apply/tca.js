
/*
var obj={
	a:1,
	getA:function(){
		alert(this===obj); //true
		alert(this.a);    //1
	}
}

obj.getA();
*/

/*
window.name='globalName';

var getName=function(){
	return this.name;
}

console.log(getName());
*/

/*
window.name='globalName';

var myObject={
	name:'jiang',
	getName: function(){
		return this.name;
	}
};

var getName=myObject.getName;

console.log(getName());
*/

/*
document.getElementById('div1').onclick=function(){
	var that=this;
	var callback=function(){
		alert(that.id);   //undefined
	}
	
	callback();
}
*/
/*
var myClass=function(){
	this.name='jiang';
	return 'name';  
} 

var obj=new myClass();
alert(obj.name);  //jiang
*/

/*
var obj1={
	name:'jiang',
	getName:function(){
		return this.name;
	}
}

var obj2={
	name:'zhi',
}

console.log(obj1.getName());   //jiang 
console.log(obj1.getName.call(obj2));   //zhi 

*/

/*
var obj={
	name:'jiang',
	getName:function(){
		return this.name;
	}
}

console.log(obj.getName());  //jiang

var getName2=obj.getName;
console.log(getName2());    //undefined
*/

/*
document.getElementById=(function(func){
	return function(){
		return func.apply(document,arguments);
	}
})(document.getElementById);

var getId=document.getElementById;
alert(getId('div1'));
*/
/*
var func=function(a,b,c){
	alert([a,b,c]);  //1,2,3
}

func.apply(null,[1,2,3]);

*/
// var func=function(a,b,c){
	// alert([a,b,c]);  //1,2,3
// }

// func.call(this,1,2,3);

// var func=function(a,b,c){
	// "use strict"
	// alert(this);   //null
	
// }

// func.apply(null,[1,2,3]);

//alert(Math.max.apply(null,[1,2,3,4,5]));  //5

/*
var obj1={
	name:'jiang',
};

var obj2={
	name:'zhi',
};

window.name='window';

var getName=function(){
	alert(this.name);
}

getName();    //window
getName.call(obj1);   //jiang
getName.call(obj2);    //zhi
 */
 /*
document.getElementById('div1').onclick=function(){
	alert(this.id);  //div1
	var func=function(){
		alert(this.id)  //undefined
	}
	func();
}
*/

document.getElementById('div1').onclick=function(){
	var func=function(){
		alert(this.id)  //div1
	}
	func.call(this);
}





