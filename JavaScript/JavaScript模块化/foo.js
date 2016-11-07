// 仅从 "bar" 模块导入 hello()
import hello from "bar";
var hungry = "hippo";

function awesome() {
	console.log(
		hello(hungry).toUpperCase()
	);
}
export awesome;