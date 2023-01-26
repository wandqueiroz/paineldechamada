const jwt = require('jsonwebtoken');
const { promisify }= require('util');
require('dotenv').config();

module.exports = {
    eAdminAuth: async function validarToken(req, res, next){
      
         const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Falha na autenticação do usuário!"
            });
        }
        const [, token] = authHeader.split(' ');
    
        if(!token){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Falha na autenticação do usuário!"
            });
        }
        try{
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
            req.userId = decoded.id
            return next();
        }catch(err){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Invalid token!"
            });
        } 
        
    }
}