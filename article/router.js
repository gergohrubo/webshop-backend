const { Router } = require('express')
const Article = require('./model')
const authMiddleware = require('../auth/middleware')

const router = new Router()

router.post('/article', authMiddleware, (req, res, next) => {
  const data = { ...req.body }
  data['user_id'] = req.user.id
  Article.create(data)
    .then(article => res.send(article))
})

router.get('/article', (req, res, next) => {
  Article.findAll()
    .then(articles => res.send(articles))
    .catch(next)
})

router.get('/article/:id', (req, res, next) => {
  Article.findByPk(req.params.id)
    .then(article => res.send(article))
    .catch(next)
})

router.put('/article/:id', authMiddleware, (req, res, next) => {
  Article.findByPk(req.params.id)
    .then(article => {
      if (article.user_id === req.user.id) {
        return article.update(req.body)
      }
      return res.status(400).send('This article is not yours to edit')
    })
    .then(article => res.send(article))
    .catch(next)
})

router.delete('/article/:id', authMiddleware, (req, res, next) => {
  Article.destroy({ where: { id: req.params.id, user_id: req.user.id } })
    .then(article => res.send({ article }))
    .catch(next)
})


module.exports = router