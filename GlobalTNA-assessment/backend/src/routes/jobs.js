const express = require('express')
const router = express.Router()
const JobReq = require('../models/JobReq')

/*
 * Route: POST /api/jobs
 * Purpose: Create a new job request 
 */
router.post('/', async (req, res, next) => {
    try {
        const result = await JobReq.create(req.body)
        res.status(201).json(result)
    } catch (err) {
        // Validation passed to the centralized error handler
        next(err)
    }
})

/*
 * Route: GET /api/jobs
 * Purpose: Return a list of all job requests
 * Supports optional query filters for category and status
 */
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

/*
 * Route: GET /api/jobs/:id
 * Purpose: Return a single job request by its unique identifier
 * else: Respond with 404 when no job matches the requested id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const requestId = req.params.id
        const result = await JobReq.findById(requestId)

        if (!result) {
            return res.status(404).json({ message: 'Job request not found.' })
        }

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

/**
 * Route:PATCH /api/jobs/:id
 * Note: only patch the status property
 */
router.patch('/:id', async (req, res, next) => {
    try {
        /**
         * behave: extract the status from the request body and return the document after the update and run schema validation on update
         */
        const { status } = req.body
        const result = await JobReq.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after', runValidators: true })

        if (!result) {
            return res.status(404).json({ message: 'Job is not found' })
        }

        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
})

/**
 * Route: DELETE '/api/jobs/:id'
 * behave: find the request id and delete if it is exist. else return a 404 error
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await JobReq.findByIdAndDelete(req.params.id)

        if (!result) {
            return res.status(404).json({ message: 'Job is not found' })
        }

        res.status(200).json({ message: `Job Request ID ${req.params.id} removed successfully` })

    } catch (err) {
        next(err)
    }
})
// Export the router so the main app can register these routes under /api/jobs.
module.exports = router