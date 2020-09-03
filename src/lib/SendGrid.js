require("dotenv").config();

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmail(to) {
  const msg = {
    to,
    from: 'meraki.app.bc@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    template_id: 'd-0732aa0fab694c34933071f8812cd930'
  }

  return sgMail.send(msg)
}

module.exports = sendEmail
