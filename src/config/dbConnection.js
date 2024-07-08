const mongoose = require('mongoose');

async function consectDB(){
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

module.exports = consectDB();