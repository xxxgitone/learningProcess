exports.jqueryTest = function(req, res){
	res.render('jquery-test');
};

exports.nurseryRhyme = function(req, res){
	res.render('nursery-rhyme');
};

exports.nurseryRhymeData = function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
};

exports.epicFail = function(req, res){
	//跟调用没有参数的setTimeout非常像，在这里异常变成异步执行的，抛出的异常被推迟到node空闲时才执行
    // 问题是当node得到空闲可以执行这个函数时，它已经没有其所服务请求的上下文了，于是会关闭整个服务器
    process.nextTick(function(){
        throw new Error('Kaboom!');
    });
};