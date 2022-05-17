const { model } = require("mongoose");
const asyncHandler = require("express-async-handler");
const suggestion = require("../router/models/Suggestion");

const createSuggestion = asyncHandler(async (req, res) => {
  try {
    const groupChat = await suggestion.create({
      suggestionName: req.body.suggestionName,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { createSuggestion };
