const express = require('express')
// faz o parse do corpo da requisição post que estaremos recebendo
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000
// importantdo as rotas
const userRoute=require('./routes/userRoute')



userRoute(app)

// método HTTP
app.get('/', (req, res) => res.send('Olá, mundo pelo Express!'))

// callback
app.listen(port, () => console.log('API rodando na porta 3000'))

// criar uma endpoint para users (GET, POST, PUT, DELETE)