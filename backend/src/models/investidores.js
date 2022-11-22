const mongoose1 = require('../db');
const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

let InvestidorSchema = new Schema({
    nomeEmpresa: {
        type: String,
        required: true,
        max: 100
    },
    
    cnpj: {
        type: String,
        required: true,
        unique: true
        
    },

    email: {
        type: String,
        unique: true,
        max: 100
    },

    endereco: {
        cep: {
            type: String,
            required: true
            
        },
    
        complemento: {
            type: String,
            required: true
            
        },
    
        rua: {
            type: String,
            required: true
            
        },
    
        bairro: {
            type: String,
            required: true
            
        },
    
        cidade: {
            type: String,
            required: true
            
        },
    
        estado: {
            type: String,
            required: true
            
        },
        numero: {
            type: String,
            required: true
            
        },
        codMunicipio: {
            type: String,
            required: true
            
        }
    },

    tipoPessoa: {
        type: String,
        required: true
        
    },

    telefone: {
        type: String,
        required: true
        
    },

    contrato: {
        type: String,
        required: true
        
    },

    tipoPregao: {
        type: String,
        required: true
        
    },

    tipoProcesso: {
        type: String,
        required: true
        
    },

    tipoServico: {
        type: String,
        required: true
        
    },

    dataSolicitacao: {
        type: String,
        required: true
        
    },

    dataEntrega: {
        type: String,
        required: true
        
    },

    banco:{
        nome: {
            type: String,
            required: true
            
        },
    
        codigo: {
            type: String,
            required: true
            
        },
    
        agencia: {
            type: String,
            required: true
            
        },
    
        conta: {
            type: String,
            required: true
            
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})



module.exports = mongoose.model('Investidor', InvestidorSchema);