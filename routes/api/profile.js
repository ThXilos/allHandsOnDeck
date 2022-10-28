const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @desc   Create or Update user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
      check("to", "To date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      skills,
      bio,
      facebook,
      instagram,
      from,
      to,
      hasAccomendation,
    } = req.body;

    //building profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (status) {
      profileFields.status = status;
    }

    if (bio) {
      profileFields.bio = bio;
    }

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    if (hasAccomendation) {
      profileFields.hasAccomendation = hasAccomendation;
    }

    profileFields.availability = {};
    if (from) {
      profileFields.availability.from = from;
    }

    if (to) {
      profileFields.availability.to = to;
    }
    //building profile object
    profileFields.social = {};

    if (facebook) {
      profileFields.social.facebook = facebook;
    }

    if (instagram) {
      profileFields.social.instagram = instagram;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/profile
// @desc   Get All Profiles
// @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id.
// @access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile is not found." });
    }
    res.json(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile is not found." });
    }
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile/
// @desc   DELETE User profile
// @access Private

router.delete("/", auth, async (req, res) => {
  try {
    // @todo  - remove users posts.
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted." });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/like/:profile_id
// @desc   Like user profile
// @access Private

router.put("/like/:profile_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profile_id);
    //Check if the post has already been liked.
    if (
      profile.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      const removeIndex = profile.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      //and then using the index you remove the like from the likes array with splice(INDEX,NUMBER OF ELEMENTS TO REMOVE)
      profile.likes.splice(removeIndex, 1);
    } else {
      profile.likes.unshift({ user: req.user.id });
    }

    // if (
    //   profile.likes.filter((like) => like.user.toString() === req.user.id)
    //     .length === 0
    // ) {
    //   profile.likes.unshift({ user: req.user.id });
    //   console.log("profile Liked");
    // }
    await profile.save();
    res.json(profile.likes);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/unlike/:profile_id
// @desc   Unlike user profile
// @access Private

// router.put("/unlike/:profile_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.profile_id);
//     //Check if the post has already been liked.
//     if (
//       profile.likes.filter((like) => like.user.toString() === req.user.id)
//         .length === 0
//     ) {
//       console.log("profile unliked");
//       return res.status(400).json({ msg: "Profile has not yet been liked." });
//     }
//     //Get remove index.
//     //Explanation because its cool, you map the like array and return the index of the like that has a user id that matches the  current user's id.
//     const removeIndex = profile.likes
//       .map((like) => like.user.toString())
//       .indexOf(req.user.id);
//     //and then using the index you remove the like from the likes array with splice(INDEX,NUMBER OF ELEMENTS TO REMOVE)
//     profile.likes.splice(removeIndex, 1);

//     await profile.save();
//     res.json(profile.likes);
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
