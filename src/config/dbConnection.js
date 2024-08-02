const mongoose = require('mongoose');

async function consectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Conectado com banco de dados!');
  } catch (erro) {
    console.log(`Conexão falhou: ${erro}.`);
  }
  return mongoose.connection;
}

module.exports = consectDB;
