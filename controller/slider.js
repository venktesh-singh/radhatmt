
const Slider = require("../modal/sliderSchema")
const bcrypt = require('bcrypt');


module.exports.addslider = async function (req, res) {
  console.log(req.body);
  const { name, alt_tag, active } = req.body; 
  const slider_pic = req.files['slider_pic'][0].filename;
  const m_slider_pic = req.files['m_slider_pic'][0].filename;

  if (!name || !slider_pic) {
    return res.status(422).json({ error: "Please fill the fields properly" });
  }

  try {

    const maxPositionSlider = await Slider.findOne().sort({ position: -1 });
    const position = maxPositionSlider ? maxPositionSlider.position + 1 : 1;
    const slider = new Slider({
      name,
      slider_pic,
      m_slider_pic,
      alt_tag,
      position,
      active,
    });

    const status = active === 'active' ? 'active' : 'inactive';
    slider.status = status;
    await slider.save();
    res.status(201).send({ message: "Add Slider Successfully.", status: 201 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};


module.exports.getslider = async function (req, res) {
    try {
      
      const sliders = await Slider.find({}).sort({ position: 1 });
  
      const formattedSliders = sliders.map(slider => ({
        ...slider._doc,
        status: slider.active === 'active' ? 'activate' : 'deactivate'
      }));
  
      res.status(200).json({ message: "Get Slider successfully", slider: formattedSliders });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };

module.exports.get_slider_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const slider = await Slider.findById({ _id })
        res.send(slider)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_slider = async function (req, res) {
  try {
    const _id = req.params.id;
    let updateData = req.body;
    console.log("Received Data", req.body);
    if (req.files) {
      updateData.slider_pic = req.files['slider_pic'][0].filename;
      updateData.m_slider_pic = req.files['m_slider_pic'][0].filename;
    }

    const status = updateData.active === 'active' ? 'active' : 'inactive';
    updateData.status = status;

    if (typeof updateData.position !== 'undefined') {
      const maxPositionSlider = await Slider.findOne().sort({ position: -1 });
      const newPosition = maxPositionSlider ? maxPositionSlider.position + 1 : 1;
    
      const positionValue = parseInt(updateData.position, 10); // Convert 'position' to an integer
    
      if (!isNaN(positionValue) && newPosition !== positionValue) {
        updateData.position = positionValue;
      }
    }
    
    console.log("Show Data",updateData);
    const slider = await Slider.findByIdAndUpdate(_id, updateData, { new: true });
    
    res.send(slider);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports.delete_slider = async function (req, res) {
    try {
        const slider = await Slider.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Slider Deleted has been Successfully.", slider });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
