const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

//retorna todos os depósitos
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'vc depositou valorDeposito'
    });
});

// retorna um depósito específico
router.get('/:id_deposito', (req, res, next) =>{
    const id = req.params.id_deposito
    if(id === 'especial'){
        res.status(200).send({
            mensagem:'foi nesse dia aqui que vc poupou dinheiro',
            id : id
        });
    } else {
        res.status(200).send({
            mensagem: 'vamos poupar'
        });
    }
}); 

//depositando
router.post('/', (req, res, next) =>{
    const deposito ={
        conta: req.body.conta,
        depositoValor: req.body.depositoValor
    }
    res.status(201).send({
        mensagem: 'Conta aberta'
    })
})


//faz um depósito
router.patch('/:valor_deposito', (req, res, next) =>{
    const valor = req.params.valor_deposito
    const resto = Number(valor)

    res.status(202).send({
        mensagem:`Você depositou ${resto}`      
    });
});

module.exports = router; 