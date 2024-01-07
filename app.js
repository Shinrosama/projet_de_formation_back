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

app.put('/api/users/:userId', async (req, res) => {
    try {
      // Logic to update password
      // ...
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

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