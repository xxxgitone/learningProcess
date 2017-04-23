//facebook授权登录
const User = require('../models/user.js');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		if(err || !user) return done(err, null);
		done(null, user);
	});
});

module.exports = function(app, options){

	 //如果没有指定成功和失败的重定向地址
    // 设定一些合理的指定值
	if(!options.successRedirect)
		options.successRedirect = '/account';
	if(!options.failureRedirect)
		options.failureRedirect = '/login';

	return {

		init: function() {
			var env = app.get('env');
			var config = options.providers;

			//配置facebook策略
			passport.use(new FacebookStrategy({
                // profile包含facebook用户信息
                //将ID添加一个前缀，目的是避免冲突（可能性小），再者可以看到用户是用什么验证方式
				clientID: config.facebook[env].appId,
				clientSecret: config.facebook[env].appSecret,
				callbackURL: 'http://localhost:3000/auth/facebook/callback',
			}, function(accessToken, refreshToken, profile, done){
				var authId = 'facebook:' + profile.id;
				User.findOne({ authId: authId }, function(err, user){
					if(err) return done(err, null);
					if(user) return done(null, user);
					user = new User({
						authId: authId,
						name: profile.displayName,
						created: Date.now(),
						role: 'customer',
					});
					user.save(function(err){
						if(err) return done(err, null);
						done(null, user);
					});
				});
			}));


			app.use(passport.initialize());
            // 放入session
			app.use(passport.session());
		},

		registerRoutes: function(){
			//注册facebook路由
			app.get('/auth/facebook', function(req, res, next){
				if(req.query.redirect) req.session.authRedirect = req.query.redirect;
				passport.authenticate('facebook')(req, res, next);
			});
			app.get('/auth/facebook/callback', passport.authenticate('facebook', 
				{ failureRedirect: options.failureRedirect }),
				function(req, res){
                    const redirect = req.session.authRedirect;
					if(redirect) delete req.session.authRedirect;
                    //只有认证成功才能到达这里
					res.redirect(303, redirect || options.successRedirect);
				}
			);
		},

	};
};