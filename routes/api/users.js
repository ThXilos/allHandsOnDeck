const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail, randomString } = require("../../mailer/mailer.js");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

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

      user = new User({ name, email, avatar, email, customToken });

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

// Add extra attribute to register user.
router.get(`/verify/:token`, async (req, res) => {
  const { token } = req.params;
  // const { id, email, customToken } = req.user;
  try {
    let user = await User.findOne({ customToken });
    const { id } = user;
    if (user.customToken === token) {
      const validated = { emailConfirmed: true };
      await User.findByIdAndUpdate(id, validated);
      res.status(200).send("Email Validated");
    } else {
      res.status(401).send("Invalid Token match.");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
