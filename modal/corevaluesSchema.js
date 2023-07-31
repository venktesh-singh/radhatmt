const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const corevaluesSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    values_pic: {
        type: String,
    },
    description: {
        type: String,
    },
    alt_tag: {
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


const Corevalues = mongooose.model('Corevalues', corevaluesSchema);  

module.exports = Corevalues;   