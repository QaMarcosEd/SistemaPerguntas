const Sequelize = require('sequelize') //importando o sequelize
const connection = require('../database/database')// importando conexão com o banco de dados

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false //impede que o campo receba valores nulos
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Pergunta.sync({force: false}).then(() => {}) //sincronizar o que está aqui com o banco de dados
//{foce: false} se a tabela já existir ele não vai recriar a tabela

module.exports = Pergunta