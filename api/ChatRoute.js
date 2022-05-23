const asyncHandler = require("express-async-handler");
const interests = require("../router/models/interestGroup");
const User = require("../router/models/Users");

//Run each function and update the collection

//In each interest group, find all the users that have this interest and add
//to list of users.
const fetchChats = asyncHandler(async (req, res) => {
  try {
    //console.log(req);
    interests
      .find({ users: { $elemMatch: { $eq: req._id } } })
      .populate("user", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  //  var users = JSON.parse(req.body.users);

  // users.push(req.user);

  try {
    const groupChat = await interests.create({
      InterestName: req.body.InterestName,
      user: [],
      review: req.body.review,
    });

    //   const fullGroupChat = await interests.findOne({ _id: groupChat._id })
    //     .populate("Users", "-password")

    //  res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await interests
    .findByIdAndUpdate(
      chatId,
      {
        $push: { user: userId },
      },
      {
        new: true,
      }
    )
    .populate("user", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await interests
    .findByIdAndUpdate(
      chatId,
      {
        $pull: { user: userId },
      },
      {
        new: true,
      }
    )
    .populate("user", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// Grabs each interest name and returns a list of just the names
const getInterestNames = asyncHandler(async (req, res) => {
  try {
    const names = await interests.find();
    const allInterests = [];
    for (let i = 0; i < names.length; i++) {
      allInterests[i] = names[i].InterestName;
    }
    res.send(allInterests);
  } catch (error) {
    console.log(error);
  }
});

// Grabs all interests from database and returns them as the whole object array
const getAllInterests = asyncHandler(async (req, res) => {
  try {
    const allInterests = await interests.find();
    res.send(allInterests);
  } catch (error) {
    console.log(error);
  }
});

// Grab the users associated with that interest
const getAllUsersInInterest = asyncHandler(async (req, res) => {
  try {
    await interests.find({ InterestName: {$eq:"basketball"}}, (err, result) => {
      if (!err) {
        res.send(result)
      }
    });
    // const listNames = [];
    // for (i = 0; i < allUsers.length; i++) {
    //   let firstName = allUsers[i].firstName.toString();
    //   listNames[i] = firstName;
    // }
    //res.send(interestObj.data);
    //console.log('sent all users', listNames);
  } catch (error) {
    console.log(error);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.email = req.body.email || user.email;
    user.primaryInterest = req.body.primaryInterest || user.primaryInterest;
    user.secondaryInterest =
      req.body.secondaryInterest || user.secondaryInterest;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const Deleteinterest = asyncHandler(async (req, res) => {
  const interest = await interests.findById(req.body._id);

  // if (interest.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (interest) {
    await interest.remove();
    res.json({ message: " Removed" });
  } else {
    res.status(404);
    throw new Error("ound");
  }
});

const updateInterest = asyncHandler(async (req, res) => {
  const interest = await interests.findById(req.body._id);
  if (interest) {
    interest.review = false;

    const updatedInterest = await interest.save();
    res.json(updatedInterest);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  getInterestNames,
  getAllInterests,
  getAllUsersInInterest,
  updateUserProfile,
  Deleteinterest,
  updateInterest,
};
