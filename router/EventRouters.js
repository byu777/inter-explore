// ************************************************** BOOKKEEPING **************************************************************
// This is the 'Router' for all functions related to events feature. It will route through all the functions/methods defined in
// a route which will be the corresponding file (ie. EventRoute.js).

const express = require("express");
//All the functions that will be executed are included in this constant
//require() provides the path; all these functions are contained in the 'EventRoute.js' file
const {
    createEvent,
    addToEvent,
    getEventsForUser,
  } = require("../api/EventRoute");

//create a routing handler
const router = express.Router(); 

// The router has to complete all the functions listed below
router.route("/createEvent").post(createEvent);
router.route("/createEventadd").post(addToEvent);
router.route("/getEventsForUser").post(getEventsForUser);

module.exports = router; 