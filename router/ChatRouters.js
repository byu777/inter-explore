const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
  getInterestNames,
  getAllInterests
} = require("../api/ChatRoute");
const router = express.Router();

router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);
router.route("/getInterestNames").get(getInterestNames);
router.route("/getAllInterests").get(getAllInterests);

module.exports = router;