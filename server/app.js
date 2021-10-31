require('dotenv').config()

const express = require('express')
const app = express()
const handleError = require('./middlewares/handleError')
const route = require('./routers/main')
const cors = require('cors')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(route)
app.use(handleError)
app.listen(process.env.PORT, () => {
    console.log('server running on port 3030')
})