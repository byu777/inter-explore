const asyncHandler = require("express-async-handler");
const events = require("../router/models/Events");
const interests = require("../router/models/interestGroup");

//Creates an event JSON object, taking info from the front-end to populate attributes based
// on the event schema 'router/models/Events.js'

const createEvent = asyncHandler(async (req, res) => {
  try {
    const makeEvent = await events.create({
        title: req.body.title,
        desc: req.body.desc,
        location: req.body.location,
        date:req.body.date,
        time:req.body.time,
        user: [],
        CurrentGroup: interests._id
    });
    console.log(makeEvent);
    res.send(makeEvent);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const addToEvent = asyncHandler(async (req, res) => {
  const { eventID, userId } = req.body;

  // check if the requester is admin

  const added = await events
    .findByIdAndUpdate(
      eventID,
      {
        $push: { user: userId },
      },
      {
        new: true,
      }
    )
    .populate("Users", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

//'module.exports' is the instruction that tells Node.js to export functions/objects
// so other files can use this exported code
// Basically, when another file runs 'EventRoute.js', it will export and be able to use this
// function, 'createEvent'
module.exports = {
  createEvent,
  addToEvent
};
