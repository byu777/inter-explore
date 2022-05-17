const express = require("express");
const {
  createSuggestion,
  getAllSuggestions,
  deleteSuggestion
} = require("../api/suggestionRoute");

const router = express.Router();

router.route("/createSuggestion").post(createSuggestion);
router.route("/getAllSuggestions").get(getAllSuggestions);
router.route("/deleteSuggestion").delete(deleteSuggestion);

module.exports = router;
