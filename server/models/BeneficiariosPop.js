const Sequelize = require('sequelize');
const db = require('../config/db');

const BeneficiariosPop = db.define('beneficiarios_pop', {
    id_beneficiario_pop: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nome_social: {
        type: Sequelize.STRING,
        allowNull: true
    },
    n_prontuario_centro_pop_centro: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data_admissao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nome_mae: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cidade_origem: {
        type: Sequelize.STRING,
        allowNull: true
    },
    vinculo_familiar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    raca: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    escolaridade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    trabalho: {
        type: Sequelize.STRING,
        allowNull: true
    },
    migrantes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    drogas_licitas: {
        type: Sequelize.STRING,
        allowNull: true
    },
    drogas_ilicitas: {
        type: Sequelize.STRING,
        allowNull: true
    },
    doencas_ou_trans_mentais: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cadunico: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pbf: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bpc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    filhos_ou_gestante: {
        type: Sequelize.STRING,
        allowNull: true
    },
    violacao_de_direitos: {
        type: Sequelize.STRING,
        allowNull: true
    },
    abandono_ou_perda_do_lar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    violencia_domestica: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nis: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rg: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: true
    },
    orientacao_sexual: {
        type: Sequelize.STRING,
        allowNull: true
    },
    estado_civil: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cadunico: {
        type: Sequelize.STRING,
        allowNull: true
    },
    p_p: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tempo_de_rua: {
        type: Sequelize.STRING,
        allowNull: true
    },
    local_permanencia: {
        type: Sequelize.STRING,
        allowNull: true
    },
    documentacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isDeleted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
});


// Verifica se a tabela existe. Se não existir, cria a tabela
//Lancamento.sync();

//Verifica as alterações da tabela e realiza a mesma
//Lancamento.sync({ alter: true });

module.exports = BeneficiariosPop;