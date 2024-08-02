const Express = require('express');
const cors = require('cors');
const routes = require('./routers/index.js');
const conectDB = require('./config/dbConnection.js');
const documents = require('../populate.js');
const product = require('./models/Products.js');

const app = new Express();

app.use(cors());

conectDB();
// async function populateDatabase() {
//     try {
//         await conectDB();

//         // Inserir dados na coleção
//         const result = await product.insertMany(documents);
//         console.log(`${result.length} documentos foram inseridos com sucesso!`);
//     } catch (err) {
//         console.error("Erro ao inserir documentos", err);
//     }
// }
// populateDatabase().catch(console.error);
routes(app);

module.exports = app;
