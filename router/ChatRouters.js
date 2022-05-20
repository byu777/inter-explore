const express = require("express");
const {
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  getInterestNames,
  getAllInterests,
  Deleteinterest,
  getAllUsers,
  updateUserProfile,
  updateInterest
} = require("../api/ChatRoute");
const router = express.Router();

router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/groupadd").put(addToGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupdelete").put(Deleteinterest);
router.route("/updateInterest").post(updateInterest);
router.route("/getInterestNames").get(getInterestNames);
router.route("/getAllInterests").get(getAllInterests);
router.route("/getAllUsers").get(getAllUsers);
router.route("/profile").post(updateUserProfile);


module.exports = router;