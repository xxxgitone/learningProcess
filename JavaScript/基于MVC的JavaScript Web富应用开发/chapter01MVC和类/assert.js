//使用下面两个工具进行展示变量的值或者函数调试结果。assert，在自动化测试中是一种常见的模式

/**
 * 如果运算结果不是真值，这个函数将抛出一个异常
 * @param   value 一个值
 * @param  {String} msg   可选消息
 */
var assert=function(value,msg){
	if(!value)
		throw (msg||(value +' does not equal true'));
}

/**
 * 表示一个值等于另一个值得另一种表示。和上面类似
 * @param val1 [description]
 * @param  val2 [description]
 * @param   msg  [description]
 */

var assertEqual=function(val1,val2,msg){
	if(val1!==val2)
		throw(msg||(val1 +' does not equal '+val2));
}


// assert(true);
// assert(false);

// assertEqual(false==true);