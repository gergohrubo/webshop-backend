const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./user/router')
const articleRouter = require('./article/router')
const loginRouter = require('./auth/router')
const app = express()
const port = process.env.PORT || 4000

const corsMiddleware = cors()
const bodyParserMiddleware = bodyParser.json()

app.use(corsMiddleware)
app.use(bodyParserMiddleware)
app.use(userRouter)
app.use(articleRouter)
app.use(loginRouter)

app.listen(port, () => console.log(`Server listening on port ${port}`))