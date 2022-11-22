const express = require('express');
const bcrypt = require('bcryptjs')
const mongoose = require('../db/index')
const jwt = require('jsonwebtoken')
const User = require('../models/user');


const router = express.Router();


router.get('/', async(req, res) =>{
    const user = await User.find()
    return res.send(user)

});

router.get('/:id', async(req, res) =>{
   const usuario = await User.findById(req.params.id)
   if(usuario == null){
        return res.status(404).json({message: 'Usuário não encontrado'})
    }

    return res.send(usuario)

});

router.post('/registro', async(req, res) =>{
const {email, cpf} = req.body

    try {
       if(await User.findOne({email})){
            return res.status(400).send({error: 'Email já existe'})
        }
       if(await User.findOne({cpf})){
            return res.status(400).send({error: 'CPF já existe'})
        }

        const user = await User.create(req.body);

        user.senha = undefined;  // removendo senha da tela

        return res.send({user});
    }catch(err){
        return res.status(400).send({ error: 'Registro falhou'});
    }

});

router.post('/autenticacao', async(req, res) => {
    const  { email, senha } = req.body;

    const user = await User.findOne({ email }).select('+senha'); // buscando usuario pelo email / e pegando senha encriptada

    if(!user)
        return res.status(400).send({error: ' Usuario não existe'});
    
    if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({error: 'Senha inválida'});

    user.senha = undefined;
    
    //gerando token
    const token = jwt.sign({id: user.id}, 'ex.123', {
        expiresIn: 86400,   // expira em 1 dia
    });


    res.send({user, token});    
    
});

router.put('/:id', async(req, res)=>{
   const {nome, cpf, email} = req.body;
   const usuario = await User.findById(req.params.id);

   if(usuario == null){
       return res.status(400).send({error: 'Usuário não existe'})
   }

   try {
       await User.findByIdAndUpdate({_id:req.params.id}, {nome:nome, cpf:cpf, email:email});
       res.json({message: 'Usuário Editado'})
   } catch (error) {
       res.status(500).json({message: error.message})
   }


})


router.delete('/:id', async(req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message: 'Usuário removido'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = app => app.use('/auth', router)