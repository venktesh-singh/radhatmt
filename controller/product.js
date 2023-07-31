const Product = require("../modal/productSchema")
const bcrypt = require('bcrypt');

module.exports.addproduct = async function (req, res) {
    const   product_pic= req?.file?.filename;
    const   product_thumbnail= req?.file?.filename;
    const { sku, name, price, sale_price,  weight, descriptions, category, stock, quantity, slug, tags } = req.body;
    if (!sku || !name || !price ) {
        return res.status(422).json({ erorr: "Please filled the field properly" });
    } try {
        const product = new Product({
            sku,
            name,
            price,
            sale_price,
            weight,
            descriptions,  
            product_thumbnail,
            product_pic,
            category, 
            stock,
            quantity,
            slug,
            tags
        });
        await product.save();

        res.status(201).send({ message: "Product Added Successfully.", status: 201 });
    } catch (err) {
        console.log(err);

    }
};

module.exports.getProduct = async function (req, res) {
    try {
        const products = await Product.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get All product successfully", product: products });
    } catch (error) {
        res.status(400).json({ error: error }); 
    }
}

module.exports.get_product_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const product = await Product.findById({ _id })
        res.send(product)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_product = async function (req, res) {
    try {
        const _id = req.params.id;
        const product = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(product)
    } catch (e) {
        res.status(500).send(e)
    }
};

module.exports.delete_product = async function (req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "Product Deleted Success.", product });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};