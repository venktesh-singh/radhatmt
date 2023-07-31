const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongooose.Schema({
    name: {
        type: String,
    },
    msg: {
        type: String,
    },
    email: {
        type: String,
        unique: false, // Ensure email is unique in the collection (optional)
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, // Regular expression for email validation    
    },
    msg: {
        type: String,  
    },
    
}, {
    timestamps: true   
})

const User = mongooose.model('USER', userSchema);

module.exports = User;