var a='Javascript'.search(/script/i);
console.log(a);//4

var b='javascript fjsjf djkf'.replace(/javascript/gi,'JavaScript');
console.log(b);

var c='1 plus 2 equal 3'.match(/\d+/g);
console.log(c);// ["1", "2", "3"]

var url=/(\w+):\/\/([\w.]+)\/(\S*)/;
var text='Visit my blog at http://www.example.com/~david';
var result=text.match(url);
console.log(result)  // ["http://www.example.com/~david", "http", "www.example.com", "~david"]
if (result!=null) {
	var fullurl=result[0];
	console.log(fullurl);  //http://www.example.com/~david
	var protocol=result[1]//http
	var host=result[2];//www.example.com
	var path=result[3];//~david
}

var d='123,456,789'.split(',');
console.log(d);   // ["123", "456", "789"]
//指定分隔符，允许两边可以留任意多的空白符
var e='1,2,3,4,5,6,7'.split(/\s*,\s*/);
console.log(e)   //["1", "2", "3", "4", "5", "6", "7"]


// var pattern=/Java/g;
// var text='JavaScript is more fun than Java';
// var result;
// while((result=pattern.exec(text))!=null){
// 	alert(result+' '+result[0]+' '+result.index);  //Java Java 0
// }

var pattern=/java/i;
alert(pattern.test("Javascript")) //true