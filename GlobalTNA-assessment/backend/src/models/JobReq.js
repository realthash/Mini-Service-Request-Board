const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        category: {
            type: String,
            enum: {
                values: ['Plumbing', 'Electrical', 'Painting','Joinery'],
                message: '{VALUE} is not a valid category'
            }
        },
        location: {
            type: String,
            trim: true
        },
        contactNumber: {
            type: String,
            trim: true
        },
        contactEmail: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid mail']
        },
        status: {
            type: String,
            enum: {
                values: ['Open', 'In Progress', 'Closed'],
                message: '{VALUE} is not a valid status'
            },
            default: 'Open'
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
)

module.exports = mongoose.model('JobReq', requestSchema)