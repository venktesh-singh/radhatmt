
const Qpm = require("../modal/qpmSchema")
const bcrypt = require('bcrypt');

module.exports.addqpm = async function (req, res) {
    console.log(req.body);
    const { name, alt_tag, short_des, active } = req.body; // Use "active" instead of "status"
    const qpm_pic = req.file.filename;
  
    if (!name || !qpm_pic) {
      return res.status(422).json({ error: "Please fill the fields properly" });
    }
  
    try {
      // Find the maximum position value from the existing documents
      const maxPositionQpm = await Qpm.findOne().sort({ position: -1 });
      const position = maxPositionQpm ? maxPositionQpm.position + 1 : 1;
  
      const qpm = new Qpm({
        name,
        qpm_pic,
        alt_tag,
        short_des,
        position,
        active,
      });
  
      await qpm.save();
  
      // Set "status" based on the value of "active"
      const status = active === 'active' ? 'active' : 'inactive';
      qpm.status = status;
      await qpm.save();
  
      res.status(201).send({ message: "Add Quality Process Management Successfully.", status: 201 });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Internal server error" });
    }
  };


module.exports.getqpm = async function (req, res) {
    try {
        const qpms = await Qpm.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Quality Process Management successfully", qpm: qpms });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_qpm_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const qpm = await Qpm.findById({ _id })
        res.send(qpm)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_qpm = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'qpm_pic' field
            const qpm_pic = req.file.filename;
            updateData.qpm_pic = qpm_pic;
        }

        const qpm = await Qpm.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(qpm);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_qpm = async function (req, res) {
    try {
        const qpm = await Qpm.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Quality Process Management Deleted Success.", qpm });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
