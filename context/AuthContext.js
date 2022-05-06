import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
        return {...state, errorMessage: action.payload };
    case 'signup':
      return {errorMessage: '', token: action.payload};
    case 'success':
      return {...state, successfulSignup: action.payload};
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({
    email,
    password,
    firstName,
    userName,
    primaryInterest,
    secondaryInterest,
  }) => {
    try {
      const response = await trackerApi.post("/signup", {
        email,
        password,
        firstName,
        userName,
        primaryInterest,
        secondaryInterest,
      });
      await AsyncStorage.setItem('token', response.data);
      dispatch({ type: 'signup', payload: response.data})
      dispatch({type: 'success', payload: true})
      //console.log(response.data);
    } catch (err) {
      //console.log(err);
      dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
    }
  };
};

// maybe make another function that gets called that sets success to false and handles navigation? this might fix problems
// currently one function does both setting signin to sucess and moving but they happen at same time so the method doesn't move properly
// change icons
// change colors and styling to fit app theme

const signin = (dispatch) => {
    return async ({
      email,
      password
    }) => {
      try {
        const response = await trackerApi.post("/signin", {
          email,
          password
        });
        console.log(response.data);
        console.log("anything")
        dispatch({type: 'successful_login', payload: response.data})
      } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign in'})
      }
    };
  };

const signout = (dispatch) => {
  return () => {
    // somehow sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: '', successfulSignup: false }
);
