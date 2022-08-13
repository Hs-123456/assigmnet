require('custom-env').env(true);
const pg = require('pg');
const Pool = pg.Pool
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// const getDBPool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'Test',
//     password: 'kusum@$971890',
//     port: 5432,
//     max: 100, // no large number for better performance
//     idleTimeoutMillis: 100000, // 10 seconds for idle client where default is 100 seconds
//     connectionTimeoutMillis : 10000 // defined 10 seconds timeout for connection failure : default is no timeout
// })

var conString = "postgres://veslfuxh:NvAZfmsmSwwCNiPED39VaVWjfM5c38El@rajje.db.elephantsql.com/veslfuxh" //Can be found in the Details page
var getDBPool = new pg.Client(conString);
getDBPool.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  getDBPool.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    // getDBPool.end();
  });
});
module.exports = getDBPool
