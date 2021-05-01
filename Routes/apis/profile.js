const express = require("express");
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post")
const request = require("request");
const config = require("config");
const { response } = require("express");

const router = express.Router();

router.get("/me", auth, async (req, res) => { 
  try {
    let profile = await Profile.findOne({ user: req.user }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({msg:"Profile does not exist"});
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({msg:"Server Error"});
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        company,
        website,
        bio,
        status,
        location,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = req.body;

      const profileFeilds = {};

      profileFeilds.user = req.user;
      if (company) profileFeilds.company = company;
      if (website) profileFeilds.website = website;
      if (bio) profileFeilds.bio = bio;
      if (status) profileFeilds.status = status;
      if (location) profileFeilds.location = location;
      if (githubusername) profileFeilds.githubusername = githubusername;
      if (skills) {
        if (typeof skills === "object") { 
          profileFeilds.skills = skills 
          }
        else {
        profileFeilds.skills = skills.split(",").map((skill) => skill.trim());
        }
      }
        
      profileFeilds.social = {};
      if (youtube) profileFeilds.social.youtube = youtube;
      if (facebook) profileFeilds.social.facebook = facebook;
      if (twitter) profileFeilds.social.twitter = twitter;
      if (instagram) profileFeilds.social.instagram = instagram;
      if (linkedin) profileFeilds.social.linkedin = linkedin;

      try {
        let profile = await Profile.findOne({ user: req.user });

        if (profile) {
          profile = await Profile.findOneAndUpdate(
            { user: req.user },
            { $set: profileFeilds },
            { new: true }
          );

          return res.json(profile);
        }

        profile = await new Profile(profileFeilds);

        await profile.save();

        res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ msg: error.message });
      }
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ msg: err.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server Error");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({user:req.user})
    await Profile.findOneAndRemove({ user: req.user });
    await User.findOneAndRemove({ _id: req.user });
    return res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send("server Error");
  }
});

// Updata profile.experience

router.put(
  "/experience",
  [
    auth,
    [
      (check("title", "title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty()),
    ],
  ],
  async (req, res) => {
    const { ...others } = req.body;
    const data = { ...others }
    
    try {
      const profile = await Profile.findOne({
        user: req.user,
      });
      profile.experience.unshift(data);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({msg:err.message});
    }
  }
);

// delete profile.experience

router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    const removeIndex = profile.experience
      .map((value) => value.id)
      .indexOf(req.params.id);
    profile.experience.splice(removeIndex, 1);
    profile.save();
    return res.json(profile);
  } catch (err) {
    res.status(400).json({msg:'Server Error'});
  }
});

// Updata profile.educaation

router.put(
  "/education",
  [
    auth,
    [
      (check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty()),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { ...others } = req.body;

    const data = { ...others };

    try {
      
      const profile = await Profile.findOne({
        user: req.user,
      });
     
      profile.education.unshift(data);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.send("Server Error");
    }
  }
);

// delete profile.education

router.delete("/education/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    const removeIndex = profile.education
      .map((value) => value.id)
      .indexOf(req.params.id);
    profile.education.splice(removeIndex, 1);
    profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({msg:'Server Error'});
  }
});

// get github data

router.get("/github/:username", (req, res) => { 
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method:"GET",
      headers: {"user-agent":"node.js"},
    }
    request(options,(error,response,body) => {
      console.log(error,response,body)
      if(error){
        console.error(error.message)
        return res.status(404).json({msg:"Not found"})
      }
      if(response.statusCode !== 200){
        return res.status(404).json({msg:"not Found"})
      }

      return res.json(JSON.parse(body))
    });

  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "Github not found" });
  }
});

module.exports = router;
