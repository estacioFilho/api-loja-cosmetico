require('dotenv/config');
const app = require('./src/app.js');

const PORT = 3001;

app.listen(PORT, () => {
  console.log('Servidor em atividade!');
  console.log('http://localhost:3001/');
});
