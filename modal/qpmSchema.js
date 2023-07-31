const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const qpmSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    qpm_pic: {
        type: String,
    },
    alt_tag: {
        type: String,
    },  
    short_des: {
        type: String,
    },
    position:{
        type:String
    },
    active:
    {    
        type: Boolean   
    },

}, {
    timestamps: true
})


const Qpm = mongooose.model('Qpm', qpmSchema);

module.exports = Qpm;   