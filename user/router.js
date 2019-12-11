const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/user', (req, res, next) => {
  const user = {
    user_name: req.body.userName,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User.create(user)
    .then(event => res.send(event))
})

router.get('/user', (req, res, next) => {
  Event.findAll()
    .then(users => res.send(users))
    .catch(next)
})

router.get('/user/:id', (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next)
})

router.put('/user/:id', (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next)
})

router.delete('/user/:id', (req, res, next) => {
  Event.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(next)
})


module.exports = router