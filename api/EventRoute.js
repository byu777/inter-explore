const asyncHandler = require("express-async-handler");
const events = require("../router/models/Events");
const interests = require("../router/models/interestGroup");
const users = require("../router/models/Users");

const createEvent = asyncHandler(async (req, res) => {
  try {
    const makeEvent = await events.create({
        title: req.body.title,
        desc: req.body.desc,
        location: req.body.location,
        date:req.body.date,
        time:req.body.time,
        user: [],
        interest_group: interest_group.InterestName,
    });

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
    createEvent
};