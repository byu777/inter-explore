const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },

    desc: {
      type: String,
      require: true,
    },

    location: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },

    time: {
      type: String,
      require: true,
    },

    // key: {
    //   type: int,
    //   require: true,
    //   unique: true,
    // },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    CurrentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "interests",
    },
  },
  {
    timestamps: true,
  }
);

const events = mongoose.model("events", eventSchema);
module.exports = events;
