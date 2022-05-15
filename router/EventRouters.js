const express = require("express");
//All the functions that will be executed are included in this constant
//require() provides the path; all these functions are contained in the 'EventRoute.js' file
const {
    createEvent,
    addToEvent
  } = require("../api/EventRoute");

//create a routing handler
const router = express.Router();

// uses the 'createEvent' function from the 'EventRoute.js' file
router.route("/createEvent").post(createEvent);
router.route("/createEventadd").post(addToEvent);

module.exports = router; 