const express = require('express')
require('dotenv').config()  /* Loads the env file */

const app = express()

app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({message: 'GlobalTNA API is running'})
})

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})