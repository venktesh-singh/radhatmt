
const User = require("../modal/userSchema")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const sendMail = require('../helpers/sendMail');
const dotenv = require('dotenv');

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the blank Field" });
        }
        // const userLogin = await User.findOne({ email: email, work: work });
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials"});
            } else {
                res.status(200).json({ message: "Login successes", user: userLogin });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.postdata = async function (req, res) {
    const { name, email, mobile, msg } = req.body;
  
    if (!name || !email) {
      return res.status(422).json({ error: "Please fill all fields properly" });
    }
  
    console.log(req.body);
  
    try {
      const user = new User({
        name,
        email,
        mobile,
        msg,
      });
  
      await user.save();
  
      const content = `
        <table style='width:100%; border: 1px solid black; border-collapse: collapse;'>
          <caption>RadhaTMT Registration Details</caption>
          <tr>
            <th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>Name</th>
            <td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>${name}</td>
          </tr>
          <tr>
            <th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>Email</th>
            <td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>${email}</td>
          </tr>
          <tr>
            <th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>Mobile</th>
            <td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>${mobile}</td>
          </tr>
          <tr>
            <th style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>Message</th>
            <td style='border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left;'>${msg}</td>
          </tr>
        </table>
      `;
  
      await sendMail(email, 'RadhaTMT Registration', content);

    res.status(201).json({ message: "Add User Register Successfully.", status: 201 });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (email already exists)
      return res.status(409).json({ error: "Email address already exists." });
    }

    console.log(err);
    return res.status(500).json({ error: "Failed to save user data." });
  }
};
  

module.exports.getUsers = async function (req, res) {
    try {
        const users = await User.find({}).sort({ "_id": -1 })
        res.status(201).json({ message: "Get user success", user: users });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports.get_user_id = async function (req, res) {
    try {
        const _id = req.params.id;
        const user = await User.findById({ _id })
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
};

module.exports.update_user = async function (req, res) {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
};

module.exports.delete_user = async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        } else {
            return res.send({ status: (201), message: "User Deleted Success.", user });
        }
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};




  
