export interface Fornecedor{
    _id: string,
    nomeEmpresa: String,
    cnpj: String,
    email: String,
    endereco: {
        cep: String,
        complemento: String,
        rua: String,
        bairro: String,
        cidade: String,
        estado: String,
        numero: number,
        codMunicipio: number
    },
    tipoPessoa: String,
    telefone: String,
    contrato: String,
    tipoPregao: String,
    tipoProcesso: String,
    tipoServico: String,
    dataSolicitacao: String,
    dataEntrega: String,
    banco:{
        nome: String,
        codigo: number,
        agencia: number,   
        conta: number
    },
}