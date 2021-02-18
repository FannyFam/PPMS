const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pwsalt: { //test
        type: String,
        required: true,
    },
    hash: { // test
        type: String,
        required: true,
    },
    designation: String,
    mobile: String,
    profile_photo: String,
    create_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    update_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel
