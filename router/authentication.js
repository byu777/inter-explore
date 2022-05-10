const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("Users");

const router = express.Router();

router.post("/signup", async (req, res) => {
// Add fullName and username
  const {email, password, firstName, userName,primaryInterest ,secondaryInterest} = req.body;

  try {
    const user = new User ({email, password, firstName, userName, primaryInterest, secondaryInterest});
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send(token);
  } catch (err) {
    return res.status(422).send(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(422).send({ error: "Must provide email" });
  }

  if (!password) {
    return res.status(422).send({ error: "Must provide password" });
  }

  User.findOne({ email: email }, async function (err, user) {
    if (user) {
      console.log(user);
      user.comparePassword(password, function (err, isMatch) {
        if (err) throw err;
        console.log("passowrd:", isMatch); // -> Password123: true
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({token: token, isMatch: isMatch});
      });
    } else {
      return res.status(422).send({ error: "Email Not Found" });
    }
  });
});

module.exports = router;
