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
        const targetId = req.params.id
        const result = await JobReq.findById(targetId)

        if (!result) {
            return res.status(404).json({ message: 'Job request not found.' })
        }

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

// Export the router so the main app can register these routes under /api/jobs.
module.exports = router