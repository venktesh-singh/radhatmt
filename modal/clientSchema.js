const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const clientSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    client_pic: {   
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
   

const Client = mongooose.model('Client', clientSchema);

module.exports = Client;   