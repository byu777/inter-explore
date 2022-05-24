const { model } = require("mongoose");
const asyncHandler = require("express-async-handler");
const suggestion = require("../router/models/Suggestion");
const interestGroup = require("../router/models/interestGroup");

const createSuggestion = asyncHandler(async (req, res) => {
  try {
    const newSuggestion = await suggestion.create({
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

const deleteSuggestion = asyncHandler(async (req, res) => {
  try {
    const suggestionItem = await suggestion.remove({
      suggestionName: req.body.suggestionName,
    });
    res.send(suggestionItem);
  } catch (error) {
    console.log(error);
  }
})

const addToInterests = asyncHandler(async (req, res) => {
  try {
    const addedInterest = await interestGroup.create({
      InterestName: req.body.InterestName,
      user: []
    });
    res.send(addedInterest);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})

const updateInterest = asyncHandler(async (req, res) => {
  try {
    const updatedInterest = await suggestion.updateOne({
      suggestionName: req.body.InterestNameOld,
    }, 
    {suggestionName: req.body.InterestNameNew})
    res.send(updatedInterest.acknowledged);
    res.send("Matched documents: " + updatedInterest.matchedCount);
    res.send("Updated documents: " + updatedInterest.modifiedCount);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})

module.exports = { createSuggestion, getAllSuggestions, deleteSuggestion, addToInterests, updateInterest };
