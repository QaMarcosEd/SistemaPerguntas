const Sequelize = require('sequelize') //importando o sequelize
const connection = require('../database/database')// importando conexão com o banco de dados

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        alowNull: false
    },
    perguntaid: { //Não é a melhor forma de fazer relacionamento, mas é a mais simples
        type: Sequelize.INTEGER,
        alowNull: false
    }
})

// Resposta.sync({force: false}).then(() => {})

module.exports = Resposta