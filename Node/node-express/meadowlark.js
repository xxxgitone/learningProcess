const express = require('express');
//引入幸运句
const fortune = require('./lib/fortune');
//处理文件上传
const formidable = require('formidable');
// 引入私密文件，包含cookies，数据库，邮箱
const credentials = require('./credentials');

const app = express();

//设置模板引擎,默认布局为main.handlebars
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    //为handlerbars的扩展方法，添加一个段落
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//设置端口，这样可以在启动服务器前通过设置环境变量覆盖端口，如果发现不是监听的3000，检查是否设置了环境变量PORT
app.set('port', process.env.PORT || 3000);

//cookie
app.use(require('cookie-parser')(credentials.cookieSecret));
//session
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));

//加载静态资源
app.use(express.static(__dirname + '/public'));

//处理表单body
app.use(require('body-parser')());

//flash即时消息
app.use(function(req, res, next) {
    //如果有即时消息，把它传到上下文中，然后清除它
    res.locals.flash = req.session.flash;

    delete req.session.flash;
    next();
})

//测试，当查询字符串test=1时
app.use(function(req, res, next) {
    //res.locals对象是要传给视图的上下文的一部分，在main.handlebars中引入，有条件的测试
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';


    next();
})

//天气数据
function getWeatherData() {
    return {
        locations: [
             {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ]
    }
}

//通过一个中间件，将天气数据绑定到res.locals.particals对象上,可以让每个页面都可以调用
app.use(function(req, res, next) {
    if(!res.locals.particals) res.locals.particals = {};
    res.locals.particals.weather = getWeatherData();

    next();
})

//首页路由
app.get('/', function(req, res) {
    res.render('home');
})

// 关于页面
app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

//hood river景点页面，包含进入request group rate页面的链接
app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
})

// request group rate页面
//用于检测用户是从哪个页面点击进来的
app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
})

// app.get('/jquery-test', function(req, res) {
//     res.render('jquery-test');
// })

app.get('/nursery-rhyme', function(req, res){
	res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res){
    //返回一个json数据
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

//注册页面
app.get('/newsletter', function(req, res) {
    // CSRF目前是个虚拟值
    res.render('newsletter', {
        csrf: 'CSRF token goes here'
    });
})

function NewsLetterSignup() {

}

NewsLetterSignup.prototype.save = function(cb) {
    cb();
}

const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

app.post('/newsletter', function(req, res) {
    const name = req.body.name || '';
    const email = req.body.email || '';

    //输入验证
    if(!email.match(VALID_EMAIL_REGEX)) {
        if(req.xhr) return res.json({error: 'Invalid name email address.'});
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error',
            message: 'The email address you entered was not valid.'
        };
        return res.redirect(303, '/newsletter/archive');
    }

    new NewsLetterSignup({ name: name, email: email }).save(function(err) {
        if(err) {
            if(req.xhr) return res.json({error: 'Database error'});
            req.session.flash = {
				type: 'danger',
				intro: 'Database error!',
				message: 'There was a database error; please try again later.',
			};
			return res.redirect(303, '/newsletter/archive');
        }
        if(req.xhr) return res.json({ success: true });
		req.session.flash = {
			type: 'success',
			intro: 'Thank you!',
			message: 'You have now been signed up for the newsletter.',
		};
		return res.redirect(303, '/newsletter/archive');
    })
})

app.get('/newsletter/archive', function(req, res){
	res.render('newsletter/archive');
});

//注册请求,从newsletter过来的表单请求,后面不在使用
app.post('/process', function(req, res) {
    //express处理表单
    // res.locals.name = req.body.name;
    // console.log(req.query.form);
    // console.log(req.body.name);
    // console.log(req.body.email);

    // res.redirect(303, '/thank-you');

    //AJax表单处理
    //req.xhr判断是否为ajax
    //req.accepts('json, html')询问最佳返回格式是json还是html
    if(req.xhr || req.accepts('json, html') === 'json') {
        res.send({success: true});

        //发生错误，应该发送{error: 'error'}

        //在这个函数内，还可以处理任何：通常会写入数据库
    } else {
        res.redirect(303, '/tank-you');

        //错误的话，因该重定向到错误页面
    }

})

//图片上传
app.get('/contest/vacation-photo', function(req, res) {
    const now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear(),
        month: now.getMonth()
    })
})

//处理上传
app.post('/contest/vacation-photo/:year/:month', function(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err) return res.redirect(303, '/error');
        console.log('reveived fields:');
        console.log(fields);
        console.log('reveived files:');
        console.log(files);
        res.redirect(303, '/thank-you');

        //接下来可以保存到数据库，或者云端
    })
})

//感谢页面
app.get('/thank-you', function(req, res) {
    res.render('thank-you');
})

//错误页面
app.get('/error', function(req, res) {
    res.render('error');
})

//定制404页面
app.use(function(req, res) {
    res.status(404);
    res.render('404');
})

//定制500页面
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhsot:' + app.get('port') + '; press Ctrl-C to terminate...');
})