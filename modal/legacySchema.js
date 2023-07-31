const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const legacySchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    legacy_pic: {
        type: String,
    },
    alt_tag: {
        type: String,
    },
    designation: {
        type: String,
    },
    description: {
        type: String,
    },
    action:{
        type:String
    },
    status:
    {    
        type: Boolean   
    },

}, {
    timestamps: true
})


const Legacy = mongooose.model('Legacy', legacySchema);

module.exports = Legacy;   