const express = require("express");
const {
  createSuggestion,
  getAllSuggestions,
} = require("../api/suggestionRoute");

const router = express.Router();

router.route("/createSuggestion").post(createSuggestion);
router.route("/getAllSuggestions").get(getAllSuggestions);

module.exports = router;
