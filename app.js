const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaSaque = require('./routes/saque');
const rotaDeposito = require('./routes/deposito');
const rotaContas = require('./routes/contas');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false})) //somente dados simples 
app.use(bodyParser.json()); //só json de entrada no body

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, GET');
        return ResizeObserver.status(200).send({});
    }

    next();
    
})

app.use('/saque', rotaSaque);
app.use('/deposito', rotaDeposito);
app.use('/contas', rotaContas);


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