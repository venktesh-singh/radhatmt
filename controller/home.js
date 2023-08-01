const Home = require("../modal/homeSchema")
const bcrypt = require('bcrypt');


exports.addhome = async function (req, res) {
  try {
    const { name, short_des, home_alt_tag, about_title, about_desc, about_alt_tag, meta_title, meta_des, home_url } = req.body;
    const home_pic = req.files['home_pic'][0].filename;
    const about_pic = req.files['about_pic'][0].filename;

    console.log('home_feature Array:', req.body.home_feature);
    if (!Array.isArray(req?.body?.home_feature)) {
      // Return an error response if home_feature is not an array
      return res.status(400).json({ error: 'Invalid home_feature data' });
    }

    const home_featureArray = req.body.home_feature.map(item => ({ f_name: item.f_name, f_value: item.f_value }));
    console.log('home_feature Array 1111:', home_featureArray);
    
    const newHome = new Home({
      name,
      short_des,
      home_pic,
      home_alt_tag,
      home_feature: home_featureArray,  
      about_title,
      about_desc,
      about_pic,
      about_alt_tag,
      meta_title,
      meta_des,
      home_url,
    });

    console.log("newHome:", newHome);

    // Save the new home document to the database
    const savedHome = await newHome.save();
    console.log("savedHome:", savedHome);

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
      const homes = await Home.find({}, "name short_des home_pic home_alt_tag home_feature about_title about_desc about_pic about_alt_tag meta_title meta_des home_url")
                              .sort({ "_id": -1 });
      res.status(201).json({ message: "Get Home successfully", Home: homes });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }


  exports.update_home = async function (req, res) {
    try {
      const _id = req.params.id;
      const { name, short_des, home_alt_tag, about_title, about_desc, about_alt_tag, meta_title, meta_des, home_url, home_feature } = req.body;
  
      // Check if files are present in the request before accessing their properties
      const home_pic = req.files['home_pic'] ? req.files['home_pic'][0].filename : undefined;
      const about_pic = req.files['about_pic'] ? req.files['about_pic'][0].filename : undefined;
  
      // Find the existing home document by _id
      const existingHome = await Home.findById(_id);
  
      if (!existingHome) {
        return res.status(404).json({ error: 'Home not found' });
      }
  
      // Update the fields in the existing home document
      existingHome.name = name;
      existingHome.short_des = short_des;
      existingHome.home_alt_tag = home_alt_tag;
      existingHome.about_title = about_title;
      existingHome.about_desc = about_desc;
      existingHome.about_alt_tag = about_alt_tag;
      existingHome.meta_title = meta_title;
      existingHome.meta_des = meta_des;
      existingHome.home_url = home_url;
      existingHome.home_pic = home_pic;
      existingHome.about_pic = about_pic;
  
      // Update home_feature only if it exists in the request body
      if (Array.isArray(home_feature)) {
        existingHome.home_feature = home_feature.map(item => ({
          f_name: item.f_name,
          f_value: item.f_value,
        }));
      }
  
      // Save the updated home document to the database
      const updatedHome = await existingHome.save();
  
      res.send(updatedHome);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  
