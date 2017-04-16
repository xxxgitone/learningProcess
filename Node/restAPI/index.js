const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
//initialize routes
app.use('/api', routes);

app.listen(process.env.pport || 4000, function() {
    console.log('now listening for requests');
});

