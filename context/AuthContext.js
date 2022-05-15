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
        const response = await trackerApi.get("/api/interests/getInterestNames");
        await dispatch({type: 'interests', payload: response.data})
      } catch (err) {
        console.log(err);
      }
};

// const addToInterests = (dispatch) => async (user) => {
//   try {
//     console.log(state.user);
//     let primary = user.primaryInterest;
//     const interestOne = await trackerApi.get("/api/interests/getInterestID", { Interest: primary })
//     console.log(interestOne)
//   } catch (err) {
//     console.log(err);
//   }
// };

// Grabs all interests from the database and searches through the interests to match them with the selected
// interests for the user, then uses those interest Id's and the user Id's to add the user to the proper group chats
async function addToInterests(user) {

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

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, getInterests},
  { token: null, errorMessage: '', user: null, interests: null}
);
