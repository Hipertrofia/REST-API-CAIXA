const express = require('express');
const app = express();
const morgan = require('morgan');

const rotaSaque = require('./routes/saque');
const rotaDeposito = require('./routes/deposito');
const rotaConta = require('./routes/conta');

app.use(morgan('dev'));

app.use('/saque', rotaSaque);
app.use('/deposito', rotaDeposito);
app.use('/conta', rotaConta);


//Erro de rota
app.use((req, res, next) =>{
    const erro= new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
})

module.exports = app;