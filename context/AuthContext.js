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

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'user_update_request':
      return { loading: true };
    case 'user_update_success':
      return { loading: false, user: action.payload, success: true };
    case 'user_update_fail':
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message'})
};

const signup = (dispatch) => async ({
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
      await AsyncStorage.setItem('token', response.data.token);
      await dispatch({ type: 'login', payload: response.data.token})
      await dispatch({type: 'setUser', payload: response.data.user})
      //console.log(response.data);
    } catch (err) {
      //console.log(err);
      await dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
    }
  };

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

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    await dispatch({type: 'signOut'})
    //console.log("Signed Out");
  };


const getInterests = (dispatch) => async () => {
      try {
        const response = await trackerApi.get("/api/interests/getInterests");
        await dispatch({type: 'interests', payload: response.data})
      } catch (err) {
        console.log(err);
      }
    };


const updateProfile = (user) => async (dispatch, getState) => {
      try {
        await dispatch({ type: 'user_update_request' });

        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        
        const { data } = await trackerApi.post("/api/interests/profile", user, config);
    
        await dispatch({ type: 'setUser', payload: data });
            // dispatch({ type: 'login', payload: data });

    
        AsyncStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        dispatch({
          type: 'user_update_fail',
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, getInterests, updateProfile},
  { token: null, errorMessage: '', user: null, interests: null} ,userUpdateReducer
);
