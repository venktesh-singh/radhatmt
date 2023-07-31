const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const processSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    process_pic: {
        type: String,
    },
    alt_tag: {
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


const Process = mongooose.model('Process', processSchema);

module.exports = Process;   