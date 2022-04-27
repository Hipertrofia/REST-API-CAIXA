const express = require('express');
const app = express();

const rotaSaque = require('./routes/saque');
const rotaDeposito = require('./routes/deposito');
const rotaConta = require('./routes/conta');

app.use('/saque', rotaSaque);
app.use('/deposito', rotaDeposito);
app.use('/conta', rotaConta);

module.exports = app;