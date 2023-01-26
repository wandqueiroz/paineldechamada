const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sgaservicedb', 'root', '', {
    host: 'localhost', 
    dialect: 'mysql',
    define: {
        freezeTableName:true,
        timestamps: false
        
    }
});

sequelize.authenticate().then(function(){
    console.log('Conexão com o Banco de Dados realizado com sucesso!');
}).catch(function(err){
    console.log('Erro ao fazer conexão com o banco de dados');
});

module.exports = sequelize;