
const Process = require("../modal/processSchema")
const bcrypt = require('bcrypt');

module.exports.addprocess = async function (req, res) {    
    console.log(req.body);
    const { name, description ,alt_tag, action, status } = req.body;
    const   process_pic= req.file.filename;
    if (!name || !process_pic) {
        return res.status(422).json({ erorr: "Please filled the field properly" });  
    } try {
        const process = new Process({
            name,
            process_pic,
            alt_tag,
            description,
            action,
            status,
        });  
            await process.save();
            res.status(201).send({ message: "Add Manufacturing Process Successfully.", status: 201 });
        
    } catch (err) {
        console.log(err);

    }
};

module.exports.getprocess = async function (req, res) {
    try {
        const proc = await Process.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Manufacturing Process successfully", process: proc });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_process_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const process = await Process.findById({ _id })
        res.send(process)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_process = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'process_pic' field
            const process_pic = req.file.filename;
            updateData.process_pic = process_pic;
        }

        const process = await Process.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(process);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_process = async function (req, res) {
    try {
        const process = await Process.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Manufacturing Process Deleted Success.", process });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
