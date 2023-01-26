const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('users_painel', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


// Verifica se a tabela existe. Se não existir, cria a tabela
//User.sync();

//Verifica as alterações da tabela e realiza a mesma
//User.sync({ alter: true });

module.exports = User;