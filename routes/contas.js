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
                                descricao: 'Retorna uma lista com todas as contas',
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
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
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
            (error, resultado, fields) => {
                conn.release();
                if (error){ return res.status(500).send({error: error})}   

                res.status(201).send({
                    mensagem: 'Conta aberta com sucesso!',
                    id_contas: resultado.insertId
                });
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
            (error, resultado, fields) => {
                conn.release();
                if (error){ return res.status(500).send({error: error})}   

                res.status(202).send({
                    mensagem: 'Os dados da conta foram atualizados'
                });
            }
        )
    })
});

router.delete('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM contas WHERE id_contas = ?`, [req.body.id_contas], 
            (error, resultado, fields) => {
                conn.release();
                if (error){ return res.status(500).send({error: error})}   

                res.status(202).send({
                    mensagem: 'A conta foi fechada'
                });
            }
        )
    })
});

module.exports = router; 