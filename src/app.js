const express = require('express');
const consectDB = require('./config/dbConnection.js');

const connection = await consectDB();

connection.on("error", (erro)=>{
    console.log(`Conexão falhou: ${erro}`);
});

connection.once('open', ()=>{
    console.log('Conectado com banco de dados!');
});

const app = new express();

module.exports = app;