var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports={
    development: {
        rootPath: rootPath,
        db: 'mongodb://admin:jagarajugara@ds053479.mongolab.com:53479/zorodatabasemongo',//'mongodb://localhost/ZorodatabaseMongo',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:jagarajugara@ds053479.mongolab.com:53479/zorodatabasemongo',
        port: process.env.PORT || 3030
    }

};