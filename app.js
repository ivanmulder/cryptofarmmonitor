'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

require('./routes/sensorRoutes')(app);
require('./routes/versionRoutes')(app, config);

app.listen(3000, () => {
    /* eslint-disable */
    console.log('Server is really up!');
});