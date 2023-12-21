const express = require('express')
const morgan = require('morgan')
const cors = require("cors")

const app = express()
const port = 3005

// const { sequelize } = require('./db/sequelizeSetup')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



app.get('/', (req, res) => {


    res.json('Hello World !')
})

const mangaRouter = require('./routes/mangaRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.use('/api/mangas', mangaRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

// app.use('/images', express.static(__dirname + '/images'));

app.use('/images', express.static(__dirname + '/images'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})