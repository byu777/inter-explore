const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
  suggestionName: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Suggestion", SuggestionSchema);
