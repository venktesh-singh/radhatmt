const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const testimonialSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    testimonial_pic: {
        type: String,
    },
    youtube_url: {
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


const Testimonial = mongooose.model('Testimonial', testimonialSchema);  

module.exports = Testimonial;   