
const Technology = require("../modal/technologySchema")
const bcrypt = require('bcrypt');

module.exports.addtechnology = async function (req, res) {    
    console.log(req.body);
    const { name, alt_tag, description,action, status } = req.body;
    const   technology_pic= req.file.filename;
    if (!name || !technology_pic) {
        return res.status(422).json({ erorr: "Please filled the fild properly" });  
    } try {
        const technology = new Technology({
            name,
            technology_pic,
            description,
            alt_tag,
            action,
            status,
        });  
            await technology.save();
            res.status(201).send({ message: "Add Technology Successfully.", status: 201 });
        
    } catch (err) {
        console.log(err);

    }
};

module.exports.gettechnology = async function (req, res) {
    try {
        const techno = await Technology.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Technology successfully", technology: techno });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_technology_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const technology = await Technology.findById({ _id })
        res.send(technology)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_technology = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'technology_pic' field
            const technology_pic = req.file.filename;
            updateData.technology_pic = technology_pic;
        }

        const technology = await Technology.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(technology);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_technology = async function (req, res) {
    try {
        const technology = await Technology.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Technology Deleted Success.", technology });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
