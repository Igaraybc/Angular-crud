const mongoose1 = require('../db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const  Schema  = mongoose.Schema;

let UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
        max: 100
    },
    
    cpf: {
        type: String,
        required: true,
        unique: true,
        max: 22,
        min: 6
    },

    email: {
        type: String,
        unique: true,
        max: 100
    },

    senha: {
        type: String,
        required: true,
        select: false    //pra não vim no array de usuarios
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

UserSchema.pre('save', async function(next){     // função para encriptar a senha
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

module.exports = mongoose.model('User', UserSchema);
