const Sequelize = require('sequelize');
const db = require('../config/db');

const AtividadePop = db.define('atividade_pop', {
    id_atividade_pop: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_beneficiario: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    servico: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


// Verifica se a tabela existe. Se não existir, cria a tabela
//Lancamento.sync();

//Verifica as alterações da tabela e realiza a mesma
//Lancamento.sync({ alter: true });

module.exports = AtividadePop;