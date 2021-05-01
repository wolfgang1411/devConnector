const express = require("express");
const auth = require("../../middlewares/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await (await User.findById(req.user)).populated('-password');
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "Server Error" });
  }
});



router.post(
  "/",
  [
    check("email", "Email is Required").not().isEmpty(),
    check("password", "Password is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({email});

      if (!user) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        id: user.id,
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message)
      return res.status(401).json({ msg: error.message });
    }
  }
);

module.exports = router;
