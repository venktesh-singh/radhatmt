
const Client = require("../modal/clientSchema")
const bcrypt = require('bcrypt');

module.exports.addclient = async function (req, res) {
    try {
        console.log(req.body); // Log the request body to see its content

        const { name, alt_tag, action, status } = req.body;
        const client_pic = req.file ? req.file.filename : null; // Check if the file is present in the request

        if (!name || !client_pic) {
            return res.status(422).json({ error: "Please fill in all the fields properly." });
        }

        const client = new Client({
            name,
            client_pic,
            alt_tag,
            action,  
            status,
        });

        await client.save();
        res.status(201).send({ message: "Add Client Successfully.", status: 201 });
    } catch (err) {
        console.log(err); // Log any error that occurs during execution
        res.status(500).json({ error: "An error occurred while adding the client." });
    }
};


module.exports.getclient = async function (req, res) {
    try {
        const clients = await Client.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Client successfully", client: clients });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_client_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const client = await Client.findById({ _id })
        res.send(client)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_client = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'client_pic' field
            const client_pic = req.file.filename;
            updateData.client_pic = client_pic;
        }

        const client = await Client.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(client);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_client = async function (req, res) {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Client Deleted Success.", client });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
