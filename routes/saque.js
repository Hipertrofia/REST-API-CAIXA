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
    mysql.getConnection((error, conn) => {
        const saque ={
            id_conta: req.body.id_conta,
            saldo: req.body.saldo,
            valor_saque: req.body.valor_saque
        }
        conn.query(
            'INSERT INTO saque (id_conta, saldo, valor_saque) VALUES (?,?,?)', 
            [req.body.id_conta, req.body.saldo, req.body.valor_saque],
            (error, resultado, field) =>{
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                
                var notas100 = 0;
                var notas50 = 0;
                var notas20 = 0;
                var notas10 = 0;

                if(valor_saque > saldo){
                    res.status(401).send({
                        mensagem: 'Você não possui saldo o suficiente para sacar este valor'
                    });
                } else{
                    if (valor_saque%10 == 0){
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
                            mensagem:`Saque realizado com ${notas100} notas de 100, ${notas50} notas de 50, ${notas20} notas de 20 e ${notas10} notas de 10`,
                            id_saque: resultado.insertId,
                            saldo: saldo - saque
                        });
                
                    } else {
                        res.status(401).send('Este terminal não possui cédulas menores que 10. Por favor, insira um valor múltiplo de 10')
                    }
                }

            }

        )
                
        
    
    
        
    })
    
     

})

module.exports = router; 