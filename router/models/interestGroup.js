const mongoose = require("mongoose");

const InterestSchema = new mongoose.Schema(
  {
    InterestName: {
      type: String,
      require: true,
    },
    currentEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    review: {
      type: Boolean,
      require: true,
      default: false,
    },
    icon_string: {
      type: String,
      require: false,
      default: "help",
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("interests", InterestSchema);
