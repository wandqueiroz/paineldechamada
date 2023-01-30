const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {eAdminAuth} = require('./middlewares/auth');
require('dotenv').config();

const { Op, where } = require('sequelize');

const app = express();

const BeneficiariosPop = require('./models/BeneficiariosPop');
const Chamadas_temp = require('./models/Chamadas_temp');
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

app.get('/getAll/:paramPesquisa', async (req, res) => {
    var paramPesquisa = new String(req.params.paramPesquisa);
    Promise.all([
      tabNow = Chamadas_temp.findAll({
        order: [['id', 'DESC']],
        limit: 1,
        where: {
            'equipamento': paramPesquisa
        }
        
    }),
      tabCad = Chamadas_temp.findAll({
        order: [['id', 'DESC']],
        limit: 1,
        where: {
            'equipamento': paramPesquisa,
            'perfil_atendimento': 'CADASTRO UNICO'
        }
        
    }),
      tabTec = Chamadas_temp.findAll({
        order: [['id', 'DESC']],
        limit: 1,
        where: {
            'equipamento': paramPesquisa,
            'perfil_atendimento': 'ATENDIMENTO TECNICO'
        }
        
    }),
    ]).then(function([tabNow, tabCad, tabTec]) {
      res.send({
        tabNow: tabNow,
        tabCad: tabCad,
        tabTec: tabTec
      });
    });
  });
  


app.get('/getAllibaba/:paramPesquisa', async (req, res) => {
    var paramPesquisa = new String(req.params.paramPesquisa);
    await Chamadas_temp.findAll({
        group: [['nome']],
        order: [['id', 'DESC']],
        limit: 4,
        where: {
            'equipamento': paramPesquisa
        }
        
    }).then(function (chamadas_temp) {
        return res.json({
            erro: false,
            chamadas_temp,
            
        });
    }).catch(function () {
        return res.json({
            erro: true,
            mensagem: "Erro! Nenhum valor encontrado no banco de dados",
            equipamento: paramPesquisa

        })

    });
});



app.get('/getNow/:paramPesquisa', async (req, res) => {

    var paramPesquisa = new String(req.params.paramPesquisa);
    await Chamadas_temp.findAll({
        order: [['id', 'DESC']],
        limit: 1,
        where: {
            'equipamento': paramPesquisa
        }
        
    }).then(function (chamadas_temp) {
        return res.json({
            erro: false,
            chamadas_temp,
            
        });
    }).catch(function () {
        return res.json({
            erro: true,
            mensagem: "Erro! Nenhum valor encontrado no banco de dados",
            equipamento: paramPesquisa

        })

    });
});

app.get('/getCad/:paramPesquisa', async (req, res) => {
    var paramPesquisa = new String(req.params.paramPesquisa);
    await Chamadas_temp.findAll({
        order: [['id', 'DESC']],
        limit: 1,
        where: {
            'equipamento': paramPesquisa,
            'perfil_atendimento': 'CADASTRO UNICO'
        }
        
    }).then(function (chamadas_temp) {
        return res.json({
            erro: false,
            chamadas_temp,
            
        });
    }).catch(function () {
        return res.json({
            erro: true,
            mensagem: "Erro! Nenhum valor encontrado no banco de dados"
        })

    });
});

app.get('/getTec/:paramPesquisa', async (req, res) => {
    var paramPesquisa = new String(req.params.paramPesquisa);
    await Chamadas_temp.findAll({
        order: [['id', 'DESC']],
        limit: 2,
        where: {
            'equipamento': paramPesquisa,
            'perfil_atendimento': 'ATENDIMENTO TECNICO'
        }
        
    }).then(function (chamadas_temp) {
        return res.json({
            erro: false,
            chamadas_temp,
            
        });
    }).catch(function () {
        return res.json({
            erro: true,
            mensagem: "Erro! Nenhum valor encontrado no banco de dados"
        })

    });
});


app.post('/add-user', async (req, res) => {
    var data = req.body;

    data.senha = await bcrypt.hash(data.senha, 8);

    await User.create(data)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Valor cadastrado com sucesso!"
            });
        }).catch(function () {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Valor não cadastrado com sucesso!"
            });
        });

});

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        attributes: ['id_usuario', 'nome', 'usuario', 'senha', 'equipamento'],
        where: {
            usuario: req.body.usuario
        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorreta!"

        });
    }


   /*  try {
        if (await bcrypt.compare(req.body.senha, user.senha)) {
            res.send('Logado com sucesso!')
        } else {
            res.send('Nao deu certo! :(')
        }
    } catch {
        res.status(500).send();
    } */

    if(!(await bcrypt.compare(req.body.senha, user.senha))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorreta!"            
        });
    }

    var token = jwt.sign({ id: user.id_usuario }, process.env.SECRET, {
        expiresIn: '1d'
    });

    return res.json({
        erro: false,
        mensagem: "Email Localizado! Seja bem vindo!",
        token: token,
        user: user.usuario,
        equipamento: user.equipamento
        
    })
});

app.get("/val-token", eAdminAuth, async (req, res)=> {
    await User.findByPk(req.userId, {attributes: ['id_usuario', 'usuario']})
    .then((user)=>{
        return res.json({
            erro: false,
            user
        });
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário efetuar login para acessar a página!"
        });
    });
});



app.listen(8081, function () {
    console.log("Servidor iniciado na porta 8081: http://localhost:8081");
});