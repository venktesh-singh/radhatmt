const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async (email, mailSubject, content) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'venkatesh.singh@plugincomm.com',
        pass: 'Venk@S999',
      },
    });
    console.log(transport.options.auth);
    const mailOptions = {
      from: 'venkatesh.singh@plugincomm.com',
      to: email,
      subject: mailSubject,
      html: content,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Mail Sent Successfully :-", info.response);    
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;

// Now you can use the sendMail function to send emails
