const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('../db/index');
const jwt = require('jsonwebtoken');
const Investidor = require('../models/investidores');

const router = express.Router();

router.get('/', async(req, res) =>{
    const investidores = await Investidor.find()
    return res.send(investidores)

});

router.get('/:id', async(req, res) =>{
    const investidor = await Investidor.findById(req.params.id)
    if(investidor == null){
         return res.status(404).json({message: 'Usuário não encontrado'})
     }
 
     return res.send(investidor)
 
 });

 router.post('/registro', async(req, res) =>{
    const {email, cnpj} = req.body
    
        try {
           if(await Investidor.findOne({email})){
                return res.status(400).send({error: 'Email já existe'})
            }
           if(await Investidor.findOne({cnpj})){
                return res.status(400).send({error: 'CPF já existe'})
            }
    
            const investidor = await Investidor.create(req.body);
    
    
            return res.send({investidor});
        }catch(err){
            return res.status(400).send({ error: 'Registro falhou'});
        }
    
    });

    router.put('/:id', async(req, res)=>{
        const {nome, cnpj, email} = req.body;
        const investidor = await Investidor.findById(req.params.id);
     
        if(investidor == null){
            return res.status(400).send({error: 'Investidor não existe'})
        }
     
        try {
            await Investidor.findByIdAndUpdate({_id:req.params.id}, {nome:nome, cnpj:cnpj, email:email});
            res.json({message: 'Investidor Editado'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
     
     
     });

     router.delete('/:id', async(req, res)=>{
        try {
            await Investidor.findByIdAndDelete(req.params.id)
            res.json({message: 'Investidor removido'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    });

    module.exports = rota => rota.use('/investidor', router)



