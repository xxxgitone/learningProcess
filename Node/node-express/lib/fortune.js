//随机幸运句,用于当作视图中的动态数据
const fortuneCookies = [
    "Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't konow",
	"You will have a pleasant surprise",
	"wheneven possible, keep is simple"
]

exports.getFortune = function() {
    const idx = Math.floor(Math.random() * fortunes.length);
    return fortuneCookies[idx];
}