// ************************************************** BOOKKEEPING **************************************************************
// This file contains the functions for GET/POST req/res to the database. The 'EventRouter' file is linked so that it routes/reads
// through this file and executes all functions one at a time. After completing each function asynchronously, it contains the
// stored data and objects (kind of like a state). Then, later the 'router.js' file will use this exported file and update the
// contents on front-end.

const asyncHandler = require("express-async-handler");
const events = require("../router/models/Events");
const interests = require("../router/models/interestGroup");
// const Users = require("../router/models/Users");
// const { events } = require("../router/models/Users");
const User = require("../router/models/Users");

//Creates an event JSON object, taking info from the front-end to populate attributes based
// on the event schema 'router/models/Events.js'

const createEvent = asyncHandler(async (req, res) => {
  try {
    console.log("does this go thru", req.body);
    const makeEvent = await events.create({
      title: req.body.title,
      desc: req.body.desc,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      user: [],
      CurrentGroup: interests._id,
    });
    console.log(makeEvent);
    res.send(makeEvent); // the response is created AFTER request made; send the new Event JSON and console.log to show
  } catch (error) {
    res.status(400).send("Sorry, that didnt go through");
    throw new Error(error.message);
  }
});

const getEventsForUser = asyncHandler(async (req, res) => {
  const { id, primaryInterest, secondaryInterest, room} = req.body;
  try {
    console.log(primaryInterest);
    console.log(secondaryInterest);
    console.log("ID: " + id);
    console.log("chatroom page: " + room);
    if (room == "chatroom") {
      //execute code to grab events from chatroom page
      console.log("Go to chatroom");
      const events = await interests.find({InterestName: primaryInterest})
      .populate("currentEvents", "title desc location")
      .then(function(doc) {
        console.log(doc);
        if (doc.length == 0) {
          res.send({response: "undefined"})
        }
        else {
          res.send(doc[0].currentEvents);
        }
      })
    }
    else {
      console.log("Go to events page");
      //execute code to grab events from the events page "event"
      /**
       * With primary/secondary interest and id, go to primary then secondary interest, grab 
       * current events array, populate, and match user ID inside user array 
       */
       const primaryInt = await interests
       .find({ InterestName: primaryInterest })
       .populate("currentEvents")
       .then(function(doc) {
         console.log(doc);
         let allEvents = [];
         if (doc.length == 0) {
           res.send({response: "undefined"});
         }
         else {
           console.log(doc[0].currentEvents[0].title);
           console.log(doc[0].currentEvents[0].desc);
           console.log(doc[0].currentEvents[0].location);
           console.log(doc[0].currentEvents);
       allEvents.push(doc[0].currentEvents[0]);
           console.log("all events below: ");
           console.log(allEvents);
           const secondaryInt = interests
       .find({ InterestName: secondaryInterest })
       .populate("currentEvents", "title desc location")
       .then(function(doc) {
         console.log(doc);
         console.log(doc[0].currentEvents[0].title);
         console.log(doc[0].currentEvents[0].desc);
         console.log(doc[0].currentEvents[0].location);
         console.log(doc[0].currentEvents);
         allEvents.push(doc[0].currentEvents[0]);
         res.send(allEvents);
       })
         }
       })
       ;
    }
    //any way to reference current logged in user's primary/secondary interest?
    //grabs users primary and secondary interests
    // User.findById(id, function (err, docs) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(docs);
    //     prInterest = docs.primaryInterest;
    //     console.log(docs.primaryInterest);
    //     scInterest = docs.secondaryInterest;
    //     console.log(docs.secondaryInterest);
    //   }
    // });
    // const eventList = await events.find();
    // //finds the event details of the secondary interests
    // console.log("Primary Interests:");

    // //grab the interests under the users primary interests, then populate the currentEvents array with the actual event details
  
    //grab the interests under the users secondary interests, then populate the currentEvents array with the actual event details
    
    //returns array of events that are apart of the interest
    
    // console.log(eventsItem);
    // check if event contains the primary or secondary interest; if so, add to 'allEvents'
    // for (let i = 0; i < eventList.length; i++) {
    //   if (
    //     eventList[i].primaryInterest == prInterest ||
    //     eventList[i].secondaryInterest == scInterest
    //   ) {
    //     allEvents += eventList[i];
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
});

// >>>>>>>>>>>>>>>> how to reference our mongodb database here?

// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authentication = require('./authentication');
// const mongoUri = 'mongodb+srv://user:123@cluster0.1ozdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(mongoUri,
//   async(err)=>{
//       if(err) throw err;
//       console.log("conncted to db")

// });

// retrieve the user's token, verify its the right token, and then set their
// status to 'subscribed' for event (updating backend)
// const retrieveEventSubscription = (pushToken, setIsSubscribed) =>
// mongoose.

const addToEvent = asyncHandler(async (req, res) => {
  const { eventID, userId } = req.body;

  // check if the requester is admin

  const added = await events
    .findByIdAndUpdate(
      eventID,
      {
        $push: { user: userId },
      },
      {
        new: true,
      }
    )
    .populate("Users", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

//'module.exports' is the instruction that tells Node.js to export functions/objects
// so other files can use this exported code
// Basically, when another file runs 'EventRoute.js', it will export and be able to use this
// function, 'createEvent'
module.exports = {
  createEvent,
  addToEvent,
  getEventsForUser,
};
