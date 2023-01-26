const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {eAdminAuth} = require('./middlewares/auth');
require('dotenv').config();

const { Op, where } = require('sequelize');

const app = express();

const BeneficiariosPop = require('./models/BeneficiariosPop');
const AtividadePop = require('./models/AtividadePop');
const AtividadeCras = require('./models/AtividadeCras');
const AtividadeCreas = require('./models/AtividadeCreas');
const User = require('./models/User');
const { decode } = require('punycode');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});



/* app.get("/getNow", (req, res) => {

    let sql = "SELECT id, nome, horario, prioridade, perfil_atendimento FROM chamadas_temp order by id desc limit 2";
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        else res.send(result);
    })
});

app.get("/getCad", (req, res) => {

    let sql = "SELECT id, nome, horario, prioridade, perfil_atendimento FROM chamadas_temp WHERE perfil_atendimento = 'CADASTRO UNICO' order by id desc limit 2";
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        else res.send(result);
    })
});

app.get("/getTec", (req, res) => {

    let sql = "SELECT id, nome, horario, prioridade, perfil_atendimento FROM chamadas_temp WHERE perfil_atendimento = 'ATENDIMENTO TECNICO' order by id desc limit 2";
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        else res.send(result);
    })
}); */

/* app.get("/", (req, res) => {
    let sql = "INSERT INTO games (name, cost, category) VALUES ('Far Cry 5', '120', 'Ação')";
    db.query(sql, (err, result) => {
        console.log(err);
    });
}); */

app.listen(8081, function () {
    console.log("Servidor iniciado na porta 8081: http://localhost:8081");
});