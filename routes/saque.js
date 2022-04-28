const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os saques
router.get('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM saque;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({error: error})}
                const response={
                    quantidade: result.length,
                    saques: result.map(saq =>{
                        return{
                            id_saque: saq.id_saque,
                            id_contas: saq.id_contas,
                            valor_saque: saq.valor_saque,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de uma conta especifica',
                                url:'http://localhost:3000/saque/'+saq.id_saque

                            }
                        }  
                    })
                }
                
                return res.status(200).send({response})
            }
        )
    })
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
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO saque (id_contas, valor_saque) VALUES (?,?)', 
            [req.body.id_contas, req.body.valor_saque],
            (error, result, field) =>{
                conn.release();
                if (error){ return res.status(500).send({error: error})}
                    
                // var notas100 = 0;
                // var notas50 = 0;
                // var notas20 = 0;
                // var notas10 = 0;
                // var resto = valor_saque;
                    
                // if ( valor_saque %10 == 0){
                //     while(resto >= 100){
                //         resto = resto - 100
                //         notas100++
                //     }
                    
                //     while(resto >= 50){
                //         resto = resto - 50
                //         notas50++
                //     }
                    
                //     while(resto >= 20){
                //         resto = resto - 20
                //         notas20++
                //     }
                    
                //     while(resto >= 10){
                //         resto = resto - 10
                //         notas10++
                //     }
                    
                //    res.status(201).send(`Saque realizado com ${notas100} notas de 100, ${notas50} notas de 50, ${notas20} notas de 20 e ${notas10} notas de 10`) 
                    
                // } else {
                //     res.status(401).send('Este terminal não possui cédulas menores que 10. Por favor, insira um valor múltiplo de 10')
                // }
        
                const response={
                    mensagem: 'saque realizado',
                    saqueEfetuado:{
                         id_saque: result.id_saque,
                         id_contas:req.body.id_contas,
                         valor_saque: req.body.valor_saque,
                         request:{
                             tipo:'GET',
                             descricao:'Retorna todos os saques',
                             url:'http://localhost:3000/saque'
                            
                         }
                    }
                }    
                return res.status(201).send(response);
            }
        )    
    })
});



module.exports = router; 