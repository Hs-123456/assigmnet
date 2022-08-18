const express = require('express');
const app = express()
let http = require('http').Server(app)
const path = require('path')
const bodyParser = require('body-parser')
const pool = require('./config/db.js');
const routes = require('./routes/route');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use('/', routes);
const PORT = process.env.PORT || 5000;
http.listen(PORT, ()=> {
    console.log(`Listening you at port ${PORT}, Database Connected!`);
})
 
