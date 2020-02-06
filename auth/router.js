const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that user name does not exist'
          })
        }
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id }),
            username: entity.username
          })
        }
        else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  }
})

module.exports = router