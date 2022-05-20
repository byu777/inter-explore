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
        ref: "Events",
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
    review:{
      type: Boolean,
      require: true,
      default: false,
  }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('interests', InterestSchema);