const express = require('express')
const mongoose = require('mongoose') /* Import mongoose library to map the db */
const cors = require('cors')

require('dotenv').config()  /* Loads the env file */

const jobRoutes = require('./routes/jobs')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
/* middleware */
app.use(express.json())

/* test route */
app.get('/', (req, res) => {
    res.status(200).json({ message: 'GlobalTNA API is running' })
})


app.use('/api/jobs', jobRoutes)

/* Global error handler */
app.use(errorHandler)

/*Connect to MongoDB, then start the server */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully Connected to MongoDB...')
        app.listen(process.env.PORT, () => {
            console.log(`server started to running on port ${process.env.PORT}`)
        })
    }).catch((err) => {
        console.error('MongoDB connection failed:', err.message)
        process.exit(1) /*Program exist with an error */
    })
