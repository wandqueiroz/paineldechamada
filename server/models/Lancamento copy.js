const Sequelize = require('sequelize');
const db = require('./db');

const Lancamento = db.define('lancamentos',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dataPagamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

// Verifica se a tabela existe. Se não existir, cria a tabela
//Lancamento.sync();

//Verifica as alterações da tabela e realiza a mesma
//Lancamento.sync({ alter: true });

module.exports = Lancamento;