const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


const db = mysql.createPool({
    host: '127.0.0.1',
    user: "root",
    password: "",
    database: "sgaservicedb",
});

app.use(cors());
app.use(express.json());

app.post("/register",(req, res) => {
    const {name} = req.body;
    const {cost} = req.body;
    const {category} = req.body;
    let sql = "INSERT INTO games (name, cost, category) VALUES (?,?,?)";
    
    db.query(sql,[name, cost, category], (err, result) => {
        console.log(err);
    });
   
});

app.get("/getNow", (req, res) => {

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
});

/* app.get("/", (req, res) => {
    let sql = "INSERT INTO games (name, cost, category) VALUES ('Far Cry 5', '120', 'Ação')";
    db.query(sql, (err, result) => {
        console.log(err);
    });
}); */

app.listen(3001, ()=>{
    console.log("Rodando servidor!");
});