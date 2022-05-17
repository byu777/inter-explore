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

const getAllSuggestions = asyncHandler(async (req, res) => {
  try {
    const allSuggestions = await suggestion.find();
    res.send(allSuggestions);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { createSuggestion, getAllSuggestions };
