const nodemailer = require("nodemailer");

const sendEmail = async (email, uniqueString) => {
  let testAccount = await nodemailer.createTestAccount();
  var Transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let sender = "AHOD_email_verification";
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Email confirmation for AHOD",
    html: `Press <a href="http://localhost:5000/api/users/verify/${uniqueString}">here</a> to verify account.`,
  };

  Transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(mailOptions.html);
    }
  });
};

const randomString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10) + 1;
    randStr += ch;
  }

  return randStr;
};

module.exports = { randomString, sendEmail };
