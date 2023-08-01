
const Approval = require("../modal/approvalSchema")
const bcrypt = require('bcrypt');

module.exports.addapproval = async function (req, res) {    
    console.log(req.body);
    const { name, alt_tag, active } = req.body;
    const   approval_pic= req.file.filename;
    if (!name || !approval_pic) {
        return res.status(422).json({ erorr: "Please filled the fild properly" });  
    } try {
        const maxPositionApproval = await Approval.findOne().sort({ position: -1 });
        const position = maxPositionApproval ? maxPositionApproval.position + 1 : 1;
        const approval = new Approval({
            name,
            approval_pic,
            alt_tag,  
            position,
            active,
        });  

        const status = active === 'active' ? 'active' : 'inactive';
        approval.status = status;
        await approval.save();
        res.status(201).send({ message: "Add Accreditations Approval Successfully.", status: 201 });
    } catch (err) {
        console.log(err);

    }
};  

module.exports.getapproval = async function (req, res) {
    try {
        const approvals = await Approval.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Accreditations Approval successfully", Approval: approvals });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_approval_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const approval = await Approval.findById({ _id })
        res.send(approval)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_approval = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'qpm_pic' field
            const approval_pic = req.file.filename;
            updateData.approval_pic = approval_pic;
        }

        const status = updateData.active === 'active' ? 'active' : 'inactive';
        updateData.status = status;
    
        if (typeof updateData.position !== 'undefined') {
          const maxPositionApproval = await Approval.findOne().sort({ position: -1 });
          const newPosition = maxPositionApproval ? maxPositionApproval.position + 1 : 1;
        
          const positionValue = parseInt(updateData.position, 10); // Convert 'position' to an integer
        
          if (!isNaN(positionValue) && newPosition !== positionValue) {
            updateData.position = positionValue;
          }
        }

        const approval = await Approval.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(approval);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_approval = async function (req, res) {
    try {
        const approval = await Approval.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Accreditations Approval Deleted Success.", qpm });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
