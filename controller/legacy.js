
const Legacy = require("../modal/legacySchema")
const bcrypt = require('bcrypt');

module.exports.addlegacy = async function (req, res) {    
    console.log(req.body);
    const { name, alt_tag, designation, description, action, status } = req.body;
    const   legacy_pic= req.file.filename;
    if (!name || !legacy_pic) {
        return res.status(422).json({ erorr: "Please filled the fild properly" });  
    } try {
        const legacy = new Legacy({
            name,
            legacy_pic,
            alt_tag,
            designation,
            description,
            action,
            status,
        });  
            await legacy.save();
            res.status(201).send({ message: "Add Legacy Successfully.", status: 201 });
        
    } catch (err) {
        console.log(err);

    }
};

module.exports.getlegacy = async function (req, res) {
    try {
        const legs = await Legacy.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Legacy successfully", legacy: legs });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_legacy_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const legacy = await Legacy.findById({ _id })
        res.send(legacy)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_legacy = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'legacy_pic' field
            const legacy_pic = req.file.filename;
            updateData.legacy_pic = legacy_pic;  
        }

        const legacy = await Legacy.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(legacy);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_legacy = async function (req, res) {
    try {
        const legacy = await Legacy.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Legacy Deleted Success.", legacy });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
