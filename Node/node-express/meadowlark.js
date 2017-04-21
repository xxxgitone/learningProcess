const express = require('express');
//引入幸运句
const fortune = require('./lib/fortune');
//处理文件上传
const formidable = require('formidable');
// 引入私密文件，包含cookies，数据库，邮箱
const credentials = require('./credentials');

const fs = require('fs');

// 数据库模型
const Vacation = require('./models/vacation');
const vacationInSeasonListener = require('./models/vacationInSeasonListener');

const emailService = require('./lib/email')(credentials);

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

//export NODE_ENV=production
//打印日志
switch(app.get('env')) {
    case 'development': 
        //紧凑的、彩色的开发日志
        app.use(require('morgan')('dev'));
        break;
    case 'production': 
        // 支持日志循环
        app.use(require('express-logger')({
            path: __dirname + '/log/requests.log'
        }));
        break;
}

const MongoSessionStore = require('session-mongoose')(require('connect'));
const sessionStore = new MongoSessionStore({ url: credentials.mongo[app.get('env')].connectionString });
//cookie
app.use(require('cookie-parser')(credentials.cookieSecret));
//session
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    store: sessionStore
}));

//加载静态资源
app.use(express.static(__dirname + '/public'));

//处理表单body
app.use(require('body-parser').json());

// database configuration
var mongoose = require('mongoose');
//可选
// var options = {
//     server: {
//         // keepAlive可以防止长期运行的应用程序出现数据库连接错误
//        socketOptions: { keepAlive: 1 } 
//     }
// };
switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

//添加初始数据
// 先查找数据库中所有Vacation，并将结果返回给回调函数。这样做的原因避免重复添加
Vacation.find(function(err, vacations){
    if(vacations.length) return;

    new Vacation({
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',
        sku: 'HR199',
        description: 'Spend a day sailing on the Columbia and ' + 
            'enjoying craft beers in Hood River!',
        priceInCents: 9995,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Oregon Coast Getaway',
        slug: 'oregon-coast-getaway',
        category: 'Weekend Getaway',
        sku: 'OC39',
        description: 'Enjoy the ocean air and quaint coastal towns!',
        priceInCents: 269995,
        tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
        inSeason: false,
        maximumGuests: 8,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Rock Climbing in Bend',
        slug: 'rock-climbing-in-bend',
        category: 'Adventure',
        sku: 'B99',
        description: 'Experience the thrill of rock climbing in the high desert.',
        priceInCents: 289995,
        tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing', 'hiking', 'skiing'],
        inSeason: true,
        requiresWaiver: true,
        maximumGuests: 4,
        available: false,
        packagesSold: 0,
        notes: 'The tour guide is currently recovering from a skiing accident.',
    }).save();
});

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

//// for now, we're mocking NewsletterSignup:
function NewsLetterSignup() {

}

NewsLetterSignup.prototype.save = function(cb) {
    cb();
}


// mocking product database
function Product(){
}
Product.find = function(conditions, fields, options, cb){
	if(typeof conditions==='function') {
		cb = conditions;
		conditions = {};
		fields = null;
		options = {};
	} else if(typeof fields==='function') {
		cb = fields;
		fields = null;
		options = {};
	} else if(typeof options==='function') {
		cb = options;
		options = {};
	}
	const products = [
		{
			name: 'Hood River Tour',
			slug: 'hood-river',
			category: 'tour',
			maximumGuests: 15,
			sku: 723,
		},
		{
			name: 'Oregon Coast Tour',
			slug: 'oregon-coast',
			category: 'tour',
			maximumGuests: 10,
			sku: 446,
		},
		{
			name: 'Rock Climbing in Bend',
			slug: 'rock-climbing/bend',
			category: 'adventure',
			requiresWaiver: true,
			maximumGuests: 4,
			sku: 944,
		}
	];
	cb(null, products.filter(function(p) {
		if(conditions.category && p.category!==conditions.category) return false;
		if(conditions.slug && p.slug!==conditions.slug) return false;
		if(isFinite(conditions.sku) && p.sku!==Number(conditions.sku)) return false;
		return true;
	}));
};
Product.findOne = function(conditions, fields, options, cb){
	if(typeof conditions==='function') {
		cb = conditions;
		conditions = {};
		fields = null;
		options = {};
	} else if(typeof fields==='function') {
		cb = fields;
		fields = null;
		options = {};
	} else if(typeof options==='function') {
		cb = options;
		options = {};
	}
	Product.find(conditions, fields, options, function(err, products){
		cb(err, products && products.length ? products[0] : null);
	});
};

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

//文件系统持久化
//确保存在目录data
const dataDir = __dirname + '/data';
const vacationPhotoDir = dataDir + '/vacation-photo';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);

function saveContestEntry(contestName, email, year, month, photoPath) {
    //TODO
}

//处理上传
app.post('/contest/vacation-photo/:year/:month', function(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // if(err) return res.redirect(303, '/error');
        // console.log('reveived fields:');
        // console.log(fields);
        // console.log('reveived files:');
        // console.log(files);
        // res.redirect(303, '/thank-you');

        //接下来可以保存到数据库，或者云端

        if(err) return res.redirect(303, '/error');
        if(err) {
            res.session.flash = {
                type: 'danger',
                intro: 'Oops!',
                message: 'There was an error processing your submission. ' + 'Please try again'
            };
            return res.redirect(303, '/contest/vacation-photo');
        }
        const photo = files.photo;
        const dir = vacationPhotoDir + '/' + Date.now();
        const path = dir + '/' + photo.name;
        fs.mkdirSync(dir);
        //修改路径，参数为 原路径 新路径
        // photo.path为formidable给上传的图片分配的一个临时路径, 文件名
        fs.renameSync(photo.path, dir + '/' + photo.name);
        saveContestEntry('vacation-photo', fields.email, req.params.year, req.params.month, path);
        res.session.flash = {
            type: 'success',
            intro: 'Gook luck',
            message: 'You have been entered into the contest'
        };
        return res.redirect(303, '/contest/vacation-photo/entries');
    })
})

app.get('/contest/vacation-photo/entries', function(req, res){
	res.render('contest/vacation-photo/entries');
});

function convertFromUSD(value, currency){
    switch(currency){
    	case 'USD': return value * 1;
        case 'GBP': return value * 0.6;
        case 'BTC': return value * 0.0023707918444761;
        default: return NaN;
    }
}

//显示产品vacations
app.get('/vacations', function(req, res) {
    Vacation.find({ available: true }, function(err, vacations) {
        const currency = req.session.currency || 'USD';
        const context = {
            currency: currency,
            vacations: vacations.map(function(vacation) {
                return {
                    sku: vacation.sku,
                    name: vacation.name,
                    description: vacation.description,
                    inSeason: vacation.inSeason,
                    price: convertFromUSD(vacation.priceInCents/100, currency),
                    qty: vacation.qty,
                }
            })
        };
        switch(currency){
	    	case 'USD': context.currencyUSD = 'selected'; break;
	        case 'GBP': context.currencyGBP = 'selected'; break;
	        case 'BTC': context.currencyBTC = 'selected'; break;
	    }
        res.render('vacations', context);
    })
})

app.get('/tours/:tour', function(req, res, next){
	Product.findOne({ category: 'tour', slug: req.params.tour }, function(err, tour){
		if(err) return next(err);
		if(!tour) return next();
		res.render('tour', { tour: tour });
	});
});
app.get('/adventures/:subcat/:name', function(req, res, next){
	Product.findOne({ category: 'adventure', slug: req.params.subcat + '/' + req.params.name  }, function(err, adventure){
		if(err) return next(err);
		if(!adventure) return next();
		res.render('adventure', { adventure: adventure });
	});
});

//自定义中间件，购物车验证
const cartValidation = require('./lib/cartValidation');

app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);

app.post('/cart/add', function(req, res, next){
	let cart = req.session.cart || (req.session.cart = []);
	Product.findOne({ sku: req.body.sku }, function(err, product){
		if(err) return next(err);
		if(!product) return next(new Error('Unknown product SKU: ' + req.body.sku));
		cart.push({
			product: product,
			guests: req.body.guests || 0,
		});
		res.redirect(303, '/cart');
	});
});
app.get('/cart', function(req, res){
	let cart = req.session.cart || (req.session.cart = []);
	res.render('cart', { cart: cart });
});

//感谢页面
app.get('/thank-you', function(req, res) {
    res.render('thank-you');
})

app.get('/cart/checkout', function(req, res, next){
	var cart = req.session.cart;
    console.log('cart ' + cart);
	if(!cart) next();
	res.render('cart-checkout');
});
app.get('/cart/thank-you', function(req, res){
	res.render('cart-thank-you', { cart: req.session.cart });
});
app.get('/email/cart/thank-you', function(req, res){
	res.render('email/cart-thank-you', { cart: req.session.cart, layout: null });
});

//购物车感谢页面
app.post('/cart/checkout', function(req, res, next) {
    const cart = req.session.cart;
    if(!cart) next(new Error('Cart does not exist'));
    const name = req.body.name || '';
    const email = req.body.email || '';
    if(!email.match(VALID_EMAIL_REGEX)) return res.next(new Error('Invalid email address.'));
    //分配一个随机的购物车ID；一般我们会用一个数据库ID
    cart.number = Math.random().toString().replace(/^0\.0*/, '');
    cart.billing = {
        name: name,
        email: email
    };

    res.render('email/cart-thank-you', {layout: null, cart: cart}, function(err, html) {
        if( err ) console.log('error in email template');
        emailService.send(cart.billing.email,
	        	'Thank you for booking your trip with Meadowlark Travel!',
	        	html);

    })

    res.render('cart-thank-you', { cart: cart });
})

//邮箱通知应季景点
app.get('/notify-me-when-in-season', function(req, res) {
    res.render('notify-me-when-in-season', {sku: req.query.sku})
})

app.post('/notify-me-when-in-season', function(req, res) {
    vacationInSeasonListener.update(
        { email: req.body.email },
        { $push: { skus: req.body.sku } },
        //设置了upsert后，会自动插入。也就是说当vacationInSeasonListener还不存在的时候就可以
        { upsert: true },
        function(err) {
            if(err) {
                console.log(err.stack);
                req.session.flash = {
                    type: 'danger',
                    intro: 'Ooops!',
                    message: 'There was an error processing your request'
                };
                return res.redirect(303, '/vacations');
            }
            req.session.flash = {
                type: 'success',
                intro: 'Thank you!',
                message: 'You will be notified when this vacation is in season'
            };
            return res.redirect(303, '/vacations');
        }
    )
})

//将用户的币别存入session
app.get('/set-currency/:currency', function(req,res){
    req.session.currency = req.params.currency;
    return res.redirect(303, '/vacations');
});

//错误页面
app.get('/error', function(req, res) {
    res.render('error');
})

app.get('/epic-fail', function(req, res) {
    //跟调用没有参数的setTimeout非常像，在这里异常变成异步执行的，抛出的异常被推迟到node空闲时才执行
    // 问题是当node得到空闲可以执行这个函数时，它已经没有其所服务请求的上下文了，于是会关闭整个服务器
    process.nextTick(function() {
        throw new Error('Kaboom');
    })
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
    console.log('Express started in ' + app.get('env') + ' mode on http://localhsot:' 
        + app.get('port') + '; press Ctrl-C to terminate...');
})