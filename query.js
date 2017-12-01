var pg = require('pg');
var parseConnectionString = require('pg-connection-string');
const connectionString = 'cbfdytvvwtljvn' + ':' + '6e0405d9247888f1c2e02f2d6b5f07f70495e194370884174fe0b25587ef0749' + 'ec2-184-73-206-155.compute-1.amazonaws.com';
const pool = new pg.Pool(typeof connectionString === 'string' ? parseConnectionString.parse(connectionString) : connectionString);
//export the adapter function
module.exports = function(queryString, queryParameters, onComplete) {
 //normalize parameters, allowing only passing a query string and an optional `onComplete` handler
 if (typeof queryParameters == 'function') {
   onComplete = queryParameters;
   queryParameters = [];
 }
 //everything else is almost the same as before, replacing hard-coded strings and arrays with parameters
 pool.connect(function(err, client, done) {
   if (err) {
     console.log(`error: connection to database failed. connection string: "${connectionString}" ${err}`);
     if (client) {
       done(client);
     }
     //check if `onComplete` exists before calling
     if (onComplete) {
       onComplete(err);
     }
     return;
   }
   client.query(queryString, queryParameters, function(err, result, pool) {
     if (err) {
       done(client);
       console.log(`error: query failed: "${queryString}", "${queryParameters}", ${err}`);
     }
     else {
       done();
     }
     //check if `onComplete` exists before calling
     if (onComplete) {
       onComplete(err, result);
     }
   });
 });

};
