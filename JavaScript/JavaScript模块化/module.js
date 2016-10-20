// (function(){

// 	var myGrades=[93,95,88,0,55,91];

// 	var average=function(){
// 		//reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。
// 		//语法：arr.reduce(callback,[initialValue])
// 		//参数
// 		/*
// callback
//     执行数组中每个值的函数，包含四个参数

//     previousValue
//         上一次调用回调返回的值，或者是提供的初始值（initialValue）
//     currentValue
//         数组中当前被处理的元素
//     index
//         当前元素在数组中的索引
//     array
//         调用 reduce 的数组

// initialValue
//     作为第一次调用 callback 的第一个参数。 
// 	*/
// 		var total=myGrades.reduce(function(accumulator,item){
// 			return accumulator+item;
// 		},0);

// 		return 'Your average grade is'+total/myGrades.length+'.';
// 	}
// 	/*
// 	filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
// 	语法：var new_arrary = arr.filter(callback[, thisArg])
// 	callback
//     用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
//     返回true表示保留该元素（通过测试），false则不保留。
// 	*/
// 	var failing = function(){ 

// 		var failingGrades = myGrades.filter(function(item) {
// 			return item < 70;
// 		}); 
// 		return 'You failed ' + failingGrades.length + ' times.'; 
// 	} 

// 	console.log(average());
// 	console.log(failing());


// })();


