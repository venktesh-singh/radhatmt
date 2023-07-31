const Home = require("../modal/homeSchema")
const bcrypt = require('bcrypt');


exports.addhome = async function (req, res) {
    try {
      const { name, short_des, home_alt_tag, about_title, about_desc, about_alt_tag, meta_title, meta_des, home_url, f_name, f_value } = req.body;
      const home_pic = req.file ? req.file.filename : null; // Check if the file is present
      const about_pic = req.file ? req.file.filename : null; // Check if the file is present
      
      const newHome = new Home({
        name,
        short_des,
        home_pic,
        home_alt_tag,
        home_feature: [{ f_name, f_value }],
        about_title,
        about_desc,  
        about_pic,
        about_alt_tag,
        meta_title,
        meta_des,
        home_url
      });
  
      // Save the new home document to the database
      const savedHome = await newHome.save();
  
      res.status(201).json({ message: 'Home added successfully', home: savedHome });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports.get_home_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const home = await Home.findById({ _id })
        res.send(home)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.gethome = async function (req, res) {
    try {
        const homes = await Home.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Accreditations Approval successfully", Home: homes });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.update_home = async function (req, res) {
    try {
      const _id = req.params.id;
      const { name, short_des, about_title, about_desc, f_name, f_value } = req.body;
      const home_pic = req.file ? req.file.filename : null; // Check if the file is present
      const about_pic = req.file ? req.file.filename : null; // Check if the file is present
  
      // Prepare the updateData object
      const updateData = {
        name,
        short_des,
        home_pic,
        home_alt_tag,
        about_title,
        about_desc,
        about_pic,
        about_alt_tag,
        meta_title,
        meta_des,
        home_url
      };
  
      // Update the home_feature array only if f_name and f_value are present in the request body
      if (f_name && f_value) {
        updateData.home_feature = [{ f_name, f_value }];
      }
  
      // Find and update the home document
      const updatedHome = await Home.findByIdAndUpdate(_id, updateData, { new: true });
  
      res.send(updatedHome);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
