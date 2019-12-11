const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/user', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User.create(user)
    .then(user => res.send(user))
})

router.get('/user', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

router.get('/user/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next)
})

router.put('/user/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next)
})

router.delete('/user/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(next)
})


module.exports = router