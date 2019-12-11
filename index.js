const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./user/router')
const articleRouter = require('./article/router')
const app = express()
const port = process.env.PORT || 4000

const bodyParserMiddleware = bodyParser.json()

app.use(bodyParserMiddleware)
app.use(userRouter)
app.use(articleRouter)

app.listen(port, () => console.log(`Server listening on port ${port}`))