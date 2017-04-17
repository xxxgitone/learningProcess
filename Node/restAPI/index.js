const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/users');
mongoose.Promise = global.Promise;

//引用静态文件
app.use(express.static('public'));

app.use(bodyParser.json());
//initialize routes
app.use('/api', routes);


//eror handling middleware
app.use(function(err, req, res, next) {
    // console.log('ERR: ' + err);
    res.status(422).send({error: err.message});
})

app.listen(process.env.pport || 4000, function() {
    console.log('now listening for requests');
});

