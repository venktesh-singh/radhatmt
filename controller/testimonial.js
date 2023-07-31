
const Testimonial = require("../modal/testimonialSchema")
const bcrypt = require('bcrypt');

module.exports.addtestimonial = async function (req, res) {    
    console.log(req.body);
    const { name, alt_tag, youtube_url,action, status } = req.body;
    const   testimonial_pic= req.file.filename;
    if (!name || !testimonial_pic) {
        return res.status(422).json({ erorr: "Please filled the fild properly" });  
    } try {
        const testimonial = new Testimonial({
            name,
            testimonial_pic,
            alt_tag,
            youtube_url,
            action,
            status,
        });  
            await testimonial.save();
            res.status(201).send({ message: "Add Testimonial Successfully.", status: 201 });
        
    } catch (err) {
        console.log(err);

    }
};

module.exports.gettestimonial = async function (req, res) {
    try {
        const testimonials = await Testimonial.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get Testimonial successfully", testimonial: testimonials });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_testimonial_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const testimonial = await Testimonial.findById({ _id })
        res.send(testimonial)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_testimonial = async function (req, res) {
    try {
        const _id = req.params.id;
        let updateData = req.body;

        // Check if there is an image file in the request
        if (req.file) {
            // Handle image upload and update the 'testimonial_pic' field
            const testimonial_pic = req.file.filename;
            updateData.testimonial_pic = testimonial_pic;  
        }

        const testimonial = await Testimonial.findByIdAndUpdate(_id, updateData, {
            new: true
        });

        res.send(testimonial);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports.delete_testimonial = async function (req, res) {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Testimonial Deleted Success.", testimonial });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};
