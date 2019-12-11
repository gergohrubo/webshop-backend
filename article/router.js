const { Router } = require('express')
const Article = require('./model')

const router = new Router()

router.post('/article', (req, res, next) => {
  Article.create(req.body)
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

router.put('/article/:id', (req, res, next) => {
  Article.findByPk(req.params.id)
    .then(article => article.update(req.body))
    .then(article => res.send(article))
    .catch(next)
})

router.delete('/article/:id', (req, res, next) => {
  Article.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(next)
})


module.exports = router