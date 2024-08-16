const Express = require('express');
const cors = require('cors');
const routes = require('./routers/index.js');
const conectDB = require('./config/dbConnection.js');

const app = new Express();

app.use(cors());

conectDB();

routes(app);

module.exports = app;
