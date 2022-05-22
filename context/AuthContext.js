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
      return {token: null, errorMessage: '', user: null, interests: null, chatGroups: null};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'interests':
      return {...state, interests: action.payload};
    case 'userInterests':
      return {...state, chatGroups: action.payload};
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
      // this might break when adding the ability to logout.
      if(response.data.user._id != undefined) {
        const user = response.data.user;
        addToInterests(user);
      }
      
      await AsyncStorage.setItem('token', response.data.token);
      await dispatch({ type: 'login', payload: response.data.token})
      await dispatch({type: 'setUser', payload: response.data.user})

      // Set user interests chat groups to state
      const chatGroups = await userInterests(response.data.user);
      await dispatch({type: 'userInterests', payload: chatGroups});
    } catch (err) {
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

        if (response.data.isMatch == true){
          await AsyncStorage.setItem('token', response.data.token);
          await dispatch({type: 'login', payload: response.data.token})
          await dispatch({type: 'setUser', payload: response.data.user})
          
          // Set user interests chat groups to state
          const chatGroups = await userInterests(response.data.user);
          await dispatch({type: 'userInterests', payload: chatGroups});

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
    console.log("Signed Out");
};


const getInterests = (dispatch) => async () => {
      try {
        const response = await trackerApi.get("/api/interests/getInterestNames");
        await dispatch({type: 'interests', payload: response.data})
      } catch (err) {
        console.log(err);
      }
};

// Grabs all interests from the database and searches through the interests to match them with the selected
// interests for the user, then uses those interest Id's and the user Id's to add the user to the proper group chats
async function addToInterests(user) {

  console.log(user);

  // Variables
  let primary = user.primaryInterest;
  let secondary = user.secondaryInterest;
  let userID = user._id;

  // api call to get interests
  const response = await trackerApi.get("/api/interests/getAllInterests")
  const listOfInterests = response.data;

  // Loop through all interests to find matches.
  for(let i = 0; i < listOfInterests.length; i++) {
    if (listOfInterests[i].InterestName == primary || listOfInterests[i].InterestName == secondary) {

      // api call to add user to group chat based on interest id and user id
      let interestID = listOfInterests[i]._id.toString();
      const res = await trackerApi.put("/api/interests/groupadd", {"chatId": interestID, "userId": userID});
    }
  }
}

async function removeFromInterests(user) {

  // Variables
  let primary = user.primaryInterest;
  let secondary = user.secondaryInterest;
  let userID = user._id;

  // api call to get interests
  const response = await trackerApi.get("/api/interests/getAllInterests")
  const listOfInterests = response.data;

  // Loop through all interests to find matches.
  for(let i = 0; i < listOfInterests.length; i++) {
    if (listOfInterests[i].InterestName == primary || listOfInterests[i].InterestName == secondary) {

      // api call to add user to group chat based on interest id and user id
      let interestID = listOfInterests[i]._id.toString();
      const res = await trackerApi.put("/api/interests/groupremove", {"chatId": interestID, "userId": userID});
    }
  }
}

async function userInterests(user) {

    // Variables
    let primary = user.primaryInterest;
    let secondary = user.secondaryInterest;
    const userInterests = [];

    // api call to get interests
    const response = await trackerApi.get("/api/interests/", user._id);
    const listOfInterests = response.data;

    for(let i = 0; i < listOfInterests.length; i++) {
      
      if (listOfInterests[i].InterestName == primary || listOfInterests[i].InterestName == secondary) {
        // api call to add user to group chat based on interest id and user id
        userInterests.push(listOfInterests[i]);
      }
    }
    return userInterests;
}



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


    const addUserInterests = (dispatch) => async (newUser) => {
      try {
        
        addToInterests(newUser);
        await AsyncStorage.setItem('token', response.data.token);
        await dispatch({type: 'setUser', payload: response.data.user})
  
        // Set user interests chat groups to state
        const chatGroups = await userInterests(response.data.user);
        await dispatch({type: 'userInterests', payload: chatGroups});

      } catch (err) {


        await dispatch({type: 'add_error', payload: ''})
      }
    };


    const removeUserInterests = (dispatch) => async (oldUser) => {
      try {
        
        removeFromInterests(oldUser);

      } catch (err) {

        await dispatch({type: 'add_error', payload: 'error in removing'})
      }
    };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, getInterests,addUserInterests,removeUserInterests},
  { token: null, errorMessage: '', user: null, interests: null}
);
