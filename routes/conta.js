const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

//retorna todas as contas
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Olha quantas contas'
    });
});

// retorna uma conta específica
router.get('/:id_conta', (req, res, next) =>{
    const id = req.params.id_conta
    if(id === 'especial'){
        res.status(200).send({
            mensagem:'Olha a sua conta... cheia de teia de aranha',
            id : id
        });
    } else {
        res.status(200).send({
            mensagem: 'vamos poupar'
        });
    }
}); 

//abrindo conta
router.post('/', (req, res, next) =>{
    const conta ={
        nome: req.body.nome,
        saldo: req.body.saldo
    }
    res.status(201).send({
        mensagem: 'Conta aberta'
    })
})

//altera um valor na conta
router.patch('/', (req, res, next) => {
    
    res.status(202).send({
        mensagem:'Vamos movimentar essa conta'      
    });
});

router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Você fechou a conta'
    })
});

module.exports = router; 