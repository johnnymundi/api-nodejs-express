//file system
const fs = require('fs')
// para lidar com a pasta de arquivos
const { join } = require('path')

// arquivo JSON para simular a interação com um db
const filePath = join(__dirname, 'users.json')
// acima há a junção da pasta __dirname com o users.json

// pegando os users
const getUsers = () => {
  // verificando se o arquivo existe
  const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath)
      : []

  try {
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// método para salvar o user simulando um db
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
  app.route('/users/:id?')
      .get((req, res) => {
        const users = getUsers()

        res.send({ users })
      })
      .post((req, res) => {
        const users = getUsers()

        // aqui pode ser incrementado outras coisas como um const { email, login, password } = req.body

        users.push(req.body)
        saveUser(users)

        res.status(201).send('OK')
      })
      .put((req, res) => {
        const users = getUsers()

        // o .map é pra criar um outro objeto atualizando o antigo, sendo que dessa vez estarei utilizando o id
        saveUser(users.map(user => {
          if (user.id == req.params.id) {
            return {
              ...user,
              ...req.body
            }
          }

          return user
        }))

        res.status(200).send('Tudo certo com o PUT')
      })
      .delete((req, res) => {
        const users = getUsers()

        // salva todos os usários menos aquele que passaremos como id
        saveUser(users.filter(user => user.id !== req.params.id))

        res.status(200).send("Usuário deletado")
      })
}

module.exports = userRoute