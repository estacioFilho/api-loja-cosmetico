require('dotenv/config');
const app = require('./src/app.js');

app.listen(process.env.PORT, () => {
  console.log('Servidor em atividade!');
  console.log('Estcutando na porta 5022');
});
