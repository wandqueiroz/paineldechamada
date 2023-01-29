const Sequelize = require('sequelize');
const db = require('../config/db');

const Chamadas_temp = db.define('chamadas_temp', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    horario: {
        type: Sequelize.STRING,
        allowNull: true
    },
    equipamento: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    perfil_atendimento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    prioridade: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


// Verifica se a tabela existe. Se não existir, cria a tabela
//Lancamento.sync();

//Verifica as alterações da tabela e realiza a mesma
//Lancamento.sync({ alter: true });

module.exports = Chamadas_temp;