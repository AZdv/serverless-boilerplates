'use strict';
module.exports.runReport = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: {
      message: 'Result: ',
      input: event,
    },
  };
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database',
    port: 'port' //if you remove this line port defaults to 3306
  });
  connection.connect();
  connection.query('SELECT * FROM users', function(err, results) {
    if (err) throw err;
    response.body.message += JSON.stringify(results);
    response.body = JSON.stringify(response.body);
    callback(null, response);
  })

  connection.end();

};
