const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const sliderSchema = new mongooose.Schema({    
    name: {
        type: String,
    },
    slider_pic: {
        type: String,
    },
    m_slider_pic: {
        type: String,
    },
    alt_tag: {
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


const Slider = mongooose.model('Slider', sliderSchema);

module.exports = Slider;   