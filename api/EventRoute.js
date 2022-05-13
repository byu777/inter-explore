const express = require("express");
const router = express.Router();
const EventModel = require("../router/models/Events");

// --------------- THIS IS WHERE YOU TELL 'ROUTER' TO DO ALL THE THINGS IT NEEDS TO DO --------------
// --------------------------------------------------------------------------------------------------

//a route to send data to; can open on the localhost:3000/place url
router.get("/", (req, res) => {
  // const data = {
  //     title: 'LoL',
  //     desc: 'MSI watch party',
  //     location: 'London',
  //     date: 'May 25, 2022',
  //     time: '11:11',
  //     user: ['Johnny', 'David'],
  //     interest_group: 'gaming',
  // };

  EventModel.find({})
    .then((data) => {
      console.log("Data ", data);
      res.json(data);
    })
    .catch((err) => {
      console.log("error: Cant read from the database rip");
      console.log("error: ", err);
    });
});

router.get("/title", (req, res) => {
  const data = {
    title: "LoL asaasasdasdasdsadasdasd",
    desc: "MSI watch party",
    location: "London",
    date: "May 25, 2022",
    time: "11:11",
    user: ["Johnny", "David"],
    interest_group: "gaming",
  };
  res.json(data);
});

// //Creates an event JSON object, taking info from the front-end to populate attributes based
// // on the event schema 'router/models/Events.js'
// const createEvent = asyncHandler(async (req, res) => {
//   try {
//     const makeEvent = await events.create({
//         title: req.body.title,
//         desc: req.body.desc,
//         location: req.body.location,
//         date:req.body.date,
//         time:req.body.time,
//         // user: [],
//         // interest_group: interest_group.InterestName,
//     });

//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

//'module.exports' is the instruction that tells Node.js to export functions/objects
// so other files can use this exported code
// Basically, when another file runs 'EventRoute.js', it will export and be able to use this
// function, 'createEvent'
// module.exports = {
//     createEvent
// };

module.exports = router;
