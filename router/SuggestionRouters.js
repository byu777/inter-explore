const express = require("express");
const { createSuggestion } = require("../api/suggestionRoute");

const router = express.Router();

router.route("/createSuggestion").post(createSuggestion);

module.exports = router;
