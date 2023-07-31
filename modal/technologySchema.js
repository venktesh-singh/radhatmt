const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const technologySchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    technology_pic: {
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


const Technology = mongooose.model('Technology', technologySchema);

module.exports = Technology;   