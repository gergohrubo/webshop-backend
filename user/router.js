const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const authMiddleware = require('../auth/middleware')

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

router.put('/user/:id', authMiddleware, (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      if (user.id === req.user.id) {
        return user.update(req.body)
      }
      return res.status(400).send('You are not authorized to update this')
    })
    .then(user => res.send(user))
    .catch(next)
})

router.delete('/user/:id', authMiddleware, (req, res, next) => {
  if (req.params.id !== req.user.id) {
    res.status(401).send('Please append valid credentials')
  }
  User.destroy({ where: { id: req.user.id } })
    .then(user => res.send({ user }))
    .catch(next)
})


module.exports = router