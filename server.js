var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3030;
var app = express();
app.set('view engine','jade');
app.set('views', __dirname + '/server/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: function(str, path){
            return stylus(str).set('filename',path);
        }
    }
));
app.use(express.static(__dirname+'/public'));
if (env=='development') {
    mongoose.connect('mongodb://localhost/ZorodatabaseMongo');
    console.log('Now you are logged into a LOCAL DB');
}
else {
    mongoose.connect('mongodb://admin:jagarajugara@ds053479.mongolab.com:53479/zorodatabasemongo');
    console.log('Now you are logged into a REMOTE DB');
}
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



app.get('/partials/:partialArea/:partialName', function(req,res) {
    res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
});
app.get('*',function(req,res){
    res.render('index'/*,{message: messageFromDatabase}*/);
});
app.listen(port);
console.log("Server running on port:"+port);
