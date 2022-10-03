const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//Function to send  email.

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

//Function the creates a random number from
const randomString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10) + 1;
    randStr += ch;
  }

  return randStr;
};

const customToken = randomString();

// @route  POST api/users
// @desc   register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({ name, email, avatar, email });

      //Encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );

      sendEmail(email, customToken);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get(`/verify/:token`, auth, async (req, res) => {
  const { token } = req.params;
  const { id, email } = req.user;
  try {
    if (token === customToken) {
      const validated = { emailConfirmed: true };
      console.log(id);
      await User.findByIdAndUpdate(id, validated);
      res.status(200).send("Email Validated");
    } else {
      console.log("Can't validate email");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
