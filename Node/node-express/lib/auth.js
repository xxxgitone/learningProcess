//facebook授权登录
const User = require('../models/user');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user._id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err || !user) return done(err, null);
        done(null, user);
    })
})

module.exports = function(app, options) {
    //如果没有指定成功和失败的重定向地址
    // 设定一些合理的指定值
    if(!options.successRedirect)
        options.successRedirect = '/account';
    if(!options.failureRedirect)
        options.failureRedirect = '/login';
    
    return {
        init: function() {

        },
        registerRoutes: function() {

        }
    }
}