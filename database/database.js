//conexão com sequelize
var Sequelize = require('sequelize')

//construção da conexão           (nomeDoBanco|nomeUsuario|Senha)
const connection = new Sequelize('nomeBanco','NomeUser','Senha',{
    host: 'localhost',
    dialect: 'mysql'
})

//exportando conexão para utilizar em outros arquivos
module.exports = connection