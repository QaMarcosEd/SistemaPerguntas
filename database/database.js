//conexão com sequelize
var Sequelize = require('sequelize')

// Foi utilizado o mysql com banco de dados
//construção da conexão           (nomeDoBanco|nomeUsuario|Senha)
const connection = new Sequelize('guiaperguntas','root','dudu.2203',{
    host: 'localhost',
    dialect: 'mysql'
})

//exportando conexão para utilizar em outros arquivos
module.exports = connection