const express = require('express');
const config = require('config');
const elasticsearch = require('./db.js');
const cors = require('cors');
const port = process.env.PORT || config.application_serverport;


const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const apiRoutes = require('./routes/routes');
app.use('', apiRoutes);


const server = require('http').createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;