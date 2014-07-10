var passport = require('passport'),
    user = require('mongoose').model('User'),
    localPassport = require('passport-local');

module.exports = function () {
    passport.use(new localPassport(function(username, password, done){
        user.findOne({ username: username}).exec(function(err, user){
            if (err) {
                console.log('Error logging user: ' + err);
                return;
            }
            if (user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done){
        if (user){
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){
        user.findOne({_id: id}).exec(function(err, user){
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
};