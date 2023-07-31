const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const approvalSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    approval_pic: {
        type: String,
    },
    alt_tag: {
        type: String,
    },  
    position:{
        type:String
    },
    status:
    {    
        type: Boolean   
    },

}, {
    timestamps: true   
})


const Approval = mongooose.model('Approval', approvalSchema);

module.exports = Approval;   