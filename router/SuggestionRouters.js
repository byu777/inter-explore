const express = require("express");
const {
  createSuggestion,
  getAllSuggestions,
  deleteSuggestion,
  addToInterests
} = require("../api/suggestionRoute");

const router = express.Router();

router.route("/createSuggestion").post(createSuggestion);
router.route("/getAllSuggestions").get(getAllSuggestions);
router.route("/deleteSuggestion").delete(deleteSuggestion);
router.route("/addToInterests").post(addToInterests);

module.exports = router;
