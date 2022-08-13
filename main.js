const express = require('express');
const app = express()
require('custom-env').env(true)
const port = process.env.port;
let http = require('http').Server(app)
const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const bodyParser = require('body-parser')
const pool = require('./config/db.js');
const routes = require('./routes/route');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use('/', routes);
http.listen(process.env.port, ()=> {
    console.log(`Listening you at port ${process.env.port}, Database Connected!`);
})
 
