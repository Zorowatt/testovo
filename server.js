var express = require('express');

var env = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);
/*    console.log('Now you are logged into a LOCAL DB');
    mongoose.connect('mongodb://admin:jagarajugara@ds053479.mongolab.com:53479/zorodatabasemongo');
    console.log('Now you are logged into a REMOTE DB');*/


// This should be uncommented if you need to clear the DB
/*var messageSchema = mongoose.Schema ({
    message: String

})

var Message = mongoose.model('Message', messageSchema);
var messageFromDatabase;


Message.remove({}).exec(function(err){
   if (err){
       console.log('Messages cannot be cleared: ' + err);
       return;
   }
    console.log('Messages deleted!');

});*/




app.listen(config.port);
console.log("Server running on port:" + config.port);
