const errorHandler = (err, req, res, next) => {
    console.log(`[ERROR] ${err.name} : ${err.message}`)

    /**
     * Mongoose ValidationError
     * Triggered by: missing required fields, failed enum/match validation
     */
    if (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map((e)=> e.message)
        return res.status(400).json({
            error: 'Validation Error',
            message: message.join(', '),
        })
    }

    /**
     * Mongoose CastError
     * Triggered by: invalid ObjectId format in URL params
     */
    if (err.name === 'CastError'){
        return res.status(400).json({
            error: 'Invalid ID',
            message:`'${err.value}' is not a valid job ID `,
        })
    }

    /**
     * Fallback — unexpected server error not exposing internal error details to the client
     */
    res.status(500).json({
        error:'Internal Server Error',
        message: 'Something went wrong. Please try again later.'
    })
}

module.exports = errorHandler