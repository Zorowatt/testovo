var mongoose = require('mongoose'),
    passport = require('passport'),
    localPassport = require('passport-local');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.once('open',function(err){
        if (err){
            console.log('Database cannot be opened: ' + err);
            return;
        }
        console.log('Database up and running ...');
    });
    db.on('error',function(err){
        console.log('Database error: ' + err);
    });

    var userSchema = mongoose.Schema ({
        username: String,
        firstName: String,
        lastName: String
        //salt: String,
        //hashPass: String
    });
    var user = mongoose.model('User',userSchema);
    user.find({}).exec(function(err, collection) {
       if (err) {
           console.log('Cannot find users: ' + err);
           return;
       }
       if (collection.length === 0) {
           user.create({username: 'zorowatt', firstName: 'Zlatozar', lastName: 'Dichev'});
           user.create({username: 'evichka', firstName: 'Eva', lastName: 'Dobreva'});
           user.create({username: 'maika', firstName: 'Patia', lastName: 'Petkova'});
           console.log('New users added to DB ... ');
       }
    });

    passport.use(new localPassport(function(username, password, done){
        User.findOne({ username: username}).exec(function(err, user){
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
        User.findOne({_id: id}).exec(function(err, user){
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
};