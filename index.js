const express = require('express') //importando o modulo express
const app = express(); //intanciando o express na variavel
const bodyParser = require('body-parser') //responsavel por traduzir os dados enviados pelo formulario em uma estrutura js para usar no back-end
const connection = require('./database/database') //carregando conexão

// Importando Models
const Pergunta = require('./model/Pergunta') //representa a tabela perguntas
const Resposta = require('./model/Resposta') //representa a tabela perguntas

//Database
//chamando conexão
connection.authenticate()
    .then(() => {
        console.log('Conexão com banco de dados feita com sucesso!')
    })
    .catch((erro) => {
        console.log(erro)
    })

//Sizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs')
// Arquivos estáticos
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false})) //comando que permite que a pessoa envie os dados do formulario e o bp vai traduzir esse dados em uma estrutura js para ser possivel usar no projeto
app.use(bodyParser.json()) //permite que leia dados de formulario enviados via Json

//Rotas
app.get('/', (req, res) => {
    //manda listar as pergunta e o then recebe a lista de perguntas
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] //condição para listagem de perguntas decrescente
    ]}).then(perguntas => { //raw: true, pesquisa crua dos dados
        res.render('index', {
            perguntas: perguntas //criando uma variavel perguntas que recebe as pergunta do bd
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => { // Se o metodo é post no formulario, também sera na rota
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    //Salvando os dados que foram enviado para esta rota no model (tabela) perguntas
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

//rota pesquisa por ID
app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id} // where = onde | {nomePesquisar: nomeComparar}
    }).then(pergunta => {
        if(pergunta != undefined) { //Pergunta encontrada

            Resposta.findAll({
                where: {perguntaid: pergunta.id}, //perguntaid for o mesmo que o id da pergunta
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => { //variavel respostas é uma lista (array contendo todas as respostas)
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })   
        }else { // Não encontrada
            res.redirect('/')
        }
    })

})

app.post('/responder', (req, res) => { //Rota que vai receber dados de formulário
    var corpo = req.body.corpo
    var perguntaid = req.body.pergunta
    //Salvando os dados que foram enviado para esta rota no model (tabela) respostas
    Resposta.create({
        corpo: corpo,
        perguntaid: perguntaid
    }).then(() => {
        //redirencionando para a pagina pergunta que foi respondida
        res.redirect('/pergunta/'+perguntaid)
    })
})

//rodando aplicação na porta 8080
app.listen(8080,() => {console.log('App rodando')})