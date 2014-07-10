var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        lastName: String,
        salt: String,
        hashPass: String,
        roles: [String]
    });

    userSchema.method ({
        authenticate: function(password){
            if (generateHashedPassword(this.salt, password) === this.hashPass) {
                return (true);
            }
            else {
                return (false);
            }
        }
    });

    var user = mongoose.model('User',userSchema);
    user.find({}).exec(function(err, collection) {
       if (err) {
           console.log('Cannot find users: ' + err);
           return;
       }

        // if you want to clear the DB and push same data to it just remove the "//", each
     //user.remove(function(){

          if (collection.length === 0) {
              var salt;
              var hashedPwd;
              salt = generateSalt();
              hashedPwd = generateHashedPassword(salt, 'zlatozar');
              user.create({username: 'zorowatt', firstName: 'Zlatozar', lastName: 'Dichev', salt: salt, hashPass: hashedPwd, roles: ['admin']});
              salt = generateSalt();
              hashedPwd = generateHashedPassword(salt, 'eva');
              user.create({username: 'evichka', firstName: 'Eva', lastName: 'Dobreva', salt: salt, hashPass: hashedPwd, roles: ['user']});
              salt = generateSalt();
              hashedPwd = generateHashedPassword(salt, 'petia');
              user.create({username: 'maika', firstName: 'Patia', lastName: 'Petkova', salt: salt, hashPass: hashedPwd});
              console.log('New users added to DB ... ');
          }
     // })
    });
};

function generateSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}