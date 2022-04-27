const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todas as contas
router.get('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM contas;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({error: error})}
                const response={
                    quantidade: result.length,
                    contas: result.map(cont =>{
                        return{
                            id_contas: cont.id_contas,
                            proprietario: cont.proprietario,
                            saldo: cont.saldo,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de uma conta especifica',
                                url:'http://localhost:3000/contas/'+cont.id_contas

                            }
                        }  
                    })
                }
                
                return res.status(200).send({response})
            }
        )
    })
    
});

router.get('/:id_contas', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM contas WHERE id_contas =?;',
            [req.params.id_contas],
            (error, result, fields) => {
                if (error) { return res.status(500).send({error: error})}
                
                if(result.length== 0){
                    return res.status(404).send({
                        mensagem:'Não encontramos uma conta com este ID'
                    })
                }
                
                const response={
                    conta: {
                        id_contas:result[0].id_contas,
                        proprietario:result[0].proprietario,
                        saldo: result[0].saldo,
                        request:{
                            tipo:'GET',
                            descricao:'Retorna todas as contas ',
                            url:'http://localhost:3000/contas'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })
})



//abrindo conta
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO contas (proprietario, saldo) VALUES (?,?)',
            [req.body.proprietario, req.body.saldo], 
            (error, result, fields) => {
                conn.release();
                if (error){ return res.status(500).send({error: error})}   
                const response={
                    mensagem:'Conta aberta com sucesso',
                    contaAberta: {
                        id_contas:result.id_contas,
                        proprietario:req.body.proprietario,
                        saldo: req.body.saldo,
                        request:{
                            tipo:'POST',
                            descricao:'Abre uma conta',
                            url:'http://localhost:3000/contas'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        ) 
    })  
});

//altera uma conta
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            `UPDATE contas
                SET proprietario =?,
                    saldo        =?
              WHERE id_contas    =?`,
            [
                req.body.proprietario,
                req.body.saldo,
                req.body.id_contas
            ], 
            (error, result, fields) => {
                conn.release();
                if (error){ return res.status(500).send({error: error})}   
                const response={
                    mensagem:'Conta atualizada com sucesso',
                    contaAtualizada: {
                        id_contas:req.body.id_contas,
                        proprietario:req.body.proprietario,
                        saldo: req.body.saldo,
                        request:{
                            tipo:'PATCH',
                            descricao:'Retorna os detalhes de uma determinada conta',
                            url:'http://localhost:3000/contas/'+req.body.id_contas
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});

router.delete('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM contas WHERE id_contas = ?`, [req.body.id_contas], 
            (error, result, fields) => {
                conn.release();
                if (error){ return res.status(500).send({error: error})}   
				const response={
					mensagem:'A Conta foi com sucesso',
					request: {
						tipo:'POST',
						descricao: 'Insere um produto',
						url:'http://localhost:3000/contas/',
						body:{
							proprietario:'String',
							saldo:'Number'
						}
					}
				}
                return res.status(202).send(response);
            }
        )
    })
});

module.exports = router; 