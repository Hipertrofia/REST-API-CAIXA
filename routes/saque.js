const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

//retorna todos os saques
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'vc sacou valorSaque'
    });
});

// retorna um saque específico
router.get('/:id_saque', (req, res, next) =>{
    const id = req.params.id_saque
    if(id === 'especial'){
        res.status(200).send({
            mensagem:'foi nesse dia saque aqui q tu gastou o dinheiro das contas com álcool!!!',
            id : id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você gasta pra krl em...'
        });
    }
}); 

//realizando um saque
router.post('/', (req, res, next) =>{
    const saque ={
        conta: req.body.conta,
        valor_saque: req.body.valor_saque
    }
    res.status(201).send({
        mensagem: 'saque realizado'
    })
})


//faz um saque
router.patch('/:valor_saque', (req, res, next) =>{
    const valor = req.params.valor_saque
    const resto = Number(valor)

    let notas100 = 0
    let notas50 = 0
    let notas20 = 0
    let notas10 = 0
   
    if (resto%10 == 0){
        while(resto >= 100){
            resto = resto - 100
            notas100++
        }
        
        while(resto >= 50){
            resto = resto - 50
            notas50++
        }
        
        while(resto >= 20){
            resto = resto - 20
            notas20++
        }
        
        while(resto >= 10){
            resto = resto - 10
            notas10++
        }
    
        res.status(202).send({
            Saque:` ${notas100} notas de 100, ${notas50} notas de 50, ${notas20} notas de 20 e ${notas10} notas de 10`
        });

    } else {
        res.status(401).send('Este terminal não possui cédulas menores que 10. Por favor, insira um valor múltiplo de 10')
    } 
    
});

module.exports = router; 