// import createDataContext from "./createDataContext";
// import trackerApi from "../api/tracker";
// import AsyncStorage from "@react-native-async-storage/async-storage";


// //Switch-case statement for the app's state; based on state, execute action and return payload
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "get_events":
//       return { ...state, getEvents: action.payload };
//     case "event_users":
//       return { ...state, userInEvents: action.payload };
//     default:
//       return state;
//   }
// };

// //Getting the users associated with event
// const getUsersForEvent = (dispatch) => async () => {
//   try {
//     const response = await trackerApi.get("/api/event_users/getUsersForEvent");
//     await dispatch({ type: "event_users", payload: response.user }); //FIX --> for each user in user array
//   } catch (err) {
//     console.log(err);
//   }
// };

// const write_event_to_db =
//   (dispatch) =>
//   async ({ title, desc, location, date, time, users, interest_group }) => {
//     try {
//       const response = await trackerApi.post("/events", {
//         title,
//         desc,
//         location,
//         date,
//         time,
//         users,
//         interest_group,
//       });
//       await AsyncStorage.setItem("event", response);
//       // await dispatch({ type: "login", payload: response.data.token });
//       // await dispatch({ type: "setUser", payload: response.data.user });
//       //console.log(response.data);
//     } catch (err) {
//       //console.log(err);
//       await dispatch({
//         type: "add_error",
//         payload: "Something went wrong with sign up",
//       });
//     }
//   };

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
