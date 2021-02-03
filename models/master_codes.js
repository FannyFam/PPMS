const mongoose = require('mongoose')

const masterCodeSchema = new mongoose.Schema({
    code_type: {
        type: String,
        required: true,      
    },
    code_value: {
        type: String,
    },    
    create_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const MasterCodeModel = mongoose.model('Master_Code', masterCodeSchema)

module.exports = MasterCodeModel
