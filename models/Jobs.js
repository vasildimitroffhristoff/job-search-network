const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    applications: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now  
    }
})

module.exports = Job = mongoose.model('job', JobSchema)