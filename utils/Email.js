const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
        auth: {
            api_key: 'e0f0afcde50e1d41751e4ecbafa46ae7-e438c741-9f65e5c5',
            domain: 'sandbox55c3b21323264e90ad5e9663187b5e9a.mailgun.org'
        }
    };

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text, cb) => {
    const mailOptions = {
        sender: name,
        from: 'ebenezer.dominguez@gmail.com',
        to: email,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

// Exporting the sendmail
module.exports = sendMail;