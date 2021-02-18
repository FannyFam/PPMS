const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text) => {
    const mailOptions = {
        sender: process.env.MAILGUN_SENDER,
        from: process.env.MAILGUN_SENDER_EMAIL,
        to: email,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    });
}

// Exporting the sendmail
module.exports = sendMail;

/*
const axios = require('axios')
const qs = require('qs')

const controllers = {
    sendForm: (req, res) => {
        const formValues = req.body

        axios.post(
            'https://api.mailgun.net/v3/sandbox55c3b21323264e90ad5e9663187b5e9a.mailgun.org/messages',
            qs.stringify({
                from: `${formValues.name} <${formValues.email}>`,
                to: `scordaive@gmail.com`,
                subject: 'New Contact Form Submission from ' + formValues.name,
                text: formValues.message
            }),
            {
                auth: {
                    username: process.env.MAILGUN_USERNAME,
                    password: process.env.MAILGUN_PASSWORD
                },
            }
        )
            .then(response => {
                res.json({
                    success: true,
                    message: "successfully sent"
                })
            })
            .catch(err => {
                console.log(err)
                res.statusCode = 500
                res.json({
                    "success": false,
                    "message": "sending failed"
                })
            })
    }
}

module.exports = controllers
*/


