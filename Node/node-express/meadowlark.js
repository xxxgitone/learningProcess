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

// add routes
require('./routes.js')(app);

//api
const Attraction = require('./models/attraction');

// const Rest = require('connect-rest')

// // API configuration
// const apiOptions = {
//     context: '/api'
// };

// const rest = Rest.create( apiOptions )

app.get('/api/attractions', function(req, res){
    Attraction.find({ approved: true }, function(err, attractions){
        console.log(attractions);
        if(err) return res.send(500, 'Error occ');
        res.json(attractions.map(function(a){
            return {
                name: a.name,
                id: a._id,
                description: a.description,
                location: a.location,
            };
        }));
    });
});

app.post('/api/attraction', function(req, res){
    console.log('log')
    var a = new Attraction({
        name: req.body.name,
        description: req.body.description,
        location: { lat: req.body.lat, lng: req.body.lng },
        history: {
            event: 'created',
            email: req.body.email,
            date: new Date(),
        },
        approved: req.body.approved || false,
    });
    a.save(function(err, a){
        if(err) return res.send(500, 'Error occ')
        res.json({ id: a._id });
    }); 
});

app.get('/api/attraction/:id', function(req, res){
    Attraction.findById(req.params.id, function(err, a){
        if(err) return res.send(500, 'Error occ');
        res.json({
            name: a.name,
            description: a.description,
            location: a.location,
        });
    });
});

// authentication
const auth = require('./lib/auth')(app, {
    providers: credentials.authProviders,
    successRedirect: '/account',
    failureRedirect: '/unauthorized',
})

//链入了Passport中间件
auth.init();

//指定auth路由
auth.registerRoutes();

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
    console.log('Express started in ' + app.get('env') + ' mode on http://localhsot:' 
        + app.get('port') + '; press Ctrl-C to terminate...');
})