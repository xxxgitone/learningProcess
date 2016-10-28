//下面两个函数来展示变量的值或者函数调用的结果


//用来表示一个特定的变量是真值。
//接受两个参数，一个值和一个可选的消息。如果运行的结果不是真，则抛异常
var assert=function(value,msg){
	if(!value)
		throw(msg||(value+" does not equal true"));
}


//表示一个值等于另外一个值得另一种表述。
var assertEqual=function(val1,val2,msg){
	if(val1!==val2){
		throw(msg||(val1+" does not equal "+val2));
	}
}


//assert(true);

//assert(false===true);//uncaught exception: false does not equal true

//assertEqual(1,2,'不相等');