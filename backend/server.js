require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configDB = require('./config/conn');
const userCltr = require('./app/controllers/user-cltr');
const router = require('./routes/user')
const taskRouter = require('./routes/tasks')
const PORT = 3595;

const app = express()
app.use(express.json())
app.use(cors())

configDB()

app.use('/api',router)
app.use('/api/tasks',taskRouter)

app.listen(PORT,() => {
    console.log('Server runnig on port no',PORT)
})