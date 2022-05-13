import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
        return {...state, errorMessage: action.payload };
    case 'login':
      return {errorMessage: '', token: action.payload};
    case 'setUser':
      return {...state, user: action.payload};
    case 'signOut':
      return {token: null, errorMessage: '', user: null};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'interests':
      return {...state, interests: action.payload};
    default:
      return state;
  }
};

const write_event_to_db = (dispatch) => async ({
    title,
    desc,
    location,
    date,
    time,
    users,
    interest_group,
  }) => {
    try {
      const response = await trackerApi.post("/events", {
        title,
        desc,
        location,
        date,
        time,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await dispatch({ type: 'login', payload: response.data.token})
      await dispatch({type: 'setUser', payload: response.data.user})
      //console.log(response.data);
    } catch (err) {
      //console.log(err);
      await dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
    }
  };

const addToEvent = asyncHandler(async (req, res) => {
    const { eventID, userId } = req.body;

    // check if the requester is admin

    const added = await events.findByIdAndUpdate(
      eventID,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("Users", "-password")

    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });

const signin = () => {
    return async ({
      title,
      desc,
      location,
      date,
      time
    }) => {
      try {
        const response = await trackerApi.post("/signin", {
          email,
          password
        });
        //console.log(response.data.isMatch)
        //console.log(response.data.token)
        if (response.data.isMatch == true){
          await AsyncStorage.setItem('token', response.data.token);
          await dispatch({type: 'login', payload: response.data.token})
          await dispatch({type: 'setUser', payload: response.data.user})
          //console.log(response.data.user.email + " In Auth Context")
        } else if (response.data.isMatch == false) {
          await dispatch({type: 'add_error', payload: 'Password is incorrect'})
        }
      } catch (err) {
        await dispatch({type: 'add_error', payload: 'Something went wrong with signin'})
      }
    };
  };