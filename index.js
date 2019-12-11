const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const bodyParserMiddleware = bodyParser.json()

app.use(bodyParserMiddleware)

app.listen(port, () => console.log(`Server listening on port ${port}`))