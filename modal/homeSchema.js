const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const homeSchema = new mongooose.Schema({ 
    name: {
      type: String,
    },
    short_des: {
      type: String,
    },
    home_pic: {
      type: String,
    },
    home_alt_tag: {
      type: String,
    },
    home_feature: [
        {
          f_name: String,
          f_value: String,
        }
    ],
    about_title: {
      type: String,
    },
    about_desc: {
      type: String,
    },
    about_pic: {
      type: String,
    },
    about_alt_tag: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_des: {
      type: String,
    },
    home_url: {  
      type: String,
    },
  }, {
    timestamps: true,
  });
  
  const Home = mongooose.model('Home', homeSchema);
  
  module.exports = Home;