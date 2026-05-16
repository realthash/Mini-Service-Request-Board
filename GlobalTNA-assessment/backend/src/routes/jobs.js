const express = require('express')
const router = express.Router()
const JobReq = require('../models/JobReq') /* Import the created model */


/*POST api/jobs - creates a new job request */
router.post('/', async (req, res, next) => {
    try {
        const result = await JobReq.create(req.body)
        res.status(201).json(result)
    } catch (err) {
        /* if validatoin failure occured forwards to the error handler middleware */
        next(err)
    }
})

/*GET api/jobs - receive a list of all job requests */
router.get('/', async (req, res, next) => {
    try {
        const filter = {}
        if (req.query.category) {
            filter.category = req.query.category
        }
        if (req.query.status) {
            filter.status = req.query.status
        }

        const result = await JobReq.find(filter).sort({ createdAt: -1 })

        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
})

/* Exporting the router, so app.js can import and use */
module.exports = router