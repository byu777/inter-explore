//  DONT NEED

import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Switch-case statement for the app's state; based on state, execute action and return payload
const EventReducer = (state, action) => {
  switch (action.type) {
    case "create_event":
      return { ...state, message: action.payload };
    case "add_users_going_event":
      return { errorMessage: "", user: action.payload };
    case "clear_all_fields":
      return { ...state, user: action.payload };
    //   case 'signOut':
    //     return {token: null, errorMessage: '', user: null};
    //   case 'clear_error_message':
    //     return {...state, errorMessage: ''};
    //   case 'interests':
    //     return {...state, interests: action.payload};
    default:
      return state;
  }
};

// //Getting the users associated with event
// const getUsersForEvent = (dispatch) => async () => {
//   try {
//     const response = await trackerApi.get("/api/event_users/getUsersForEvent");
//     await dispatch({ type: "event_users", payload: response.user }); //FIX --> for each user in user array
//   } catch (err) {
//     console.log(err);
//   }
// };

const WriteEventToDB =
  (dispatch) =>
  async ({ title, location, date, time, desc }) => {
    try {
      //this route '/createEvent' is the POST method to write to DB
      const response = await trackerApi.post("/createEvent", {
        title,
        location,
        date,
        userName,
        time,
        desc,
      });

      //check if JSON object is made
      console.log(response);

      await AsyncStorage.setItem("token", response.data.token); //what is this line doing?
      await dispatch({ type: "login", payload: response.data.token });
      await dispatch({ type: "setUser", payload: response.data.user });
      //console.log(response.data);
    } catch (err) {
      //console.log(err);
      await dispatch({
        type: "add_error",
        payload: "@@@ Event creation was unsuccessful!",
      });
    }
  };

export const { Provider, Context } = createDataContext(
  EventReducer,
  { WriteEventToDB },
  { token: null, message: "", user: null, events: null }
);

// const addToEvent = asyncHandler(async (req, res) => {
//   const { eventID, userId } = req.body;

//   // check if the requester is admin

//   const added = await events
//     .findByIdAndUpdate(
//       eventID,
//       {
//         $push: { users: userId },
//       },
//       {
//         new: true,
//       }
//     )
//     .populate("Users", "-password");

//   if (!added) {
//     res.status(404);
//     throw new Error("Chat Not Found");
//   } else {
//     res.json(added);
//   }
// });

// export const { Provider, Context } = createDataContext(
//   authReducer,
//   { getUsersForEvent },
//   { token: null, errorMessage: "", user: null, interests: null }
// );
