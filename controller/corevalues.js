
const Corevalues = require("../modal/corevaluesSchema")
const bcrypt = require('bcrypt');

module.exports.addcorevalues = async function (req, res) {    
    console.log(req.body);
    const { name, alt_tag, description, action, status } = req.body;
    const   values_pic= req.file.filename;
    if (!name || !values_pic) {
        return res.status(422).json({ erorr: "Please filled the fild properly" });  
    } try {
        const corevalues = new Corevalues({
            name,
            values_pic,
            alt_tag,
            description,
            action,
            status,
        });  
            await corevalues.save();
            res.status(201).send({ message: "Add Core Values Successfully.", status: 201 });
        
    } catch (err) {
        console.log(err);

    }
};

module.exports.getcorevalues = async function (req, res) {
    try {
        const corevalues = await Corevalues.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Core Values successfully", corevalues: corevalues });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_corevalues_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const corevalues = await Corevalues.findById({ _id })
        res.send(corevalues)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_corevalues = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'slider_pic' field
            const values_pic = req.file.filename;
            updateData.values_pic = values_pic;
        }

        const corevalues = await Corevalues.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(corevalues);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_corevalues = async function (req, res) { 
    try {
        const corevalues = await Corevalues.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Core Values Deleted Success.", corevalues });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
