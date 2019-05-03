'use strict';
require("dotenv").config(); // read .env file if present.

const nodemailer = require("nodemailer");
module.exports.hello = async (event, context, callback) => {
  const user = process.env.MAIL_USER;       // some@mail.com
  const pass = process.env.MAIL_PASSWORD;   // 42isthecoolestnumber
  
  let transporter = nodemailer.createTransport({
    host: "secure.emailsrvr.com",
    port: 465,
    secure: true,
    auth: { user, pass }
  });
  
  // Parse data sent in form hook (email, name etc)
  const data = JSON.parse(event.body);
  console.log(data);
  
  // make sure we have data and email
  if (!data || !data.email) {
    return callback(null, {
      statusCode: 400,
      body: 'Mailing details not provided'
    })
  }
  
  let mailOptions = {
    from: `${data.name} <noreply@nicera.in>`,
    to: `walk12288@gmail.com`, // send to email from contact form
    subject: data.subject,
    html: `<p><strong>From:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Message</strong>: ${data.message}</p>` // returns html code with interpolated variables
  };

  console.log('sending mail');
  let response = await transporter.sendMail(mailOptions);
  console.log('mail sent');
  console.log(response);

  //Add a callback to let our user know the email was a success -  handle failures.
  callback(null, {
    statusCode: 200,
    body: "mail sent successfully"
  });
};
