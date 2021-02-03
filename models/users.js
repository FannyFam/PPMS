const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
      first: { type: String, trim: true},
      last: { type: String, trim: true}
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
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
    }
})

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel
