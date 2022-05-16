const express = require("express");
const {
  createEvent
} = require("../api/EventRoute");
const router = express.Router();

router.route("/createEvent").get(createEvent);

module.exports = router;