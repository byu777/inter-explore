import createDataContext from "./createDataContext";
import trackerApi from "./../backend/tracker";


const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
        return {...state, errorMessage: action.payload };
    case 'login':
      return {errorMessage: '', token: action.payload};
    case 'setUser':
      return {...state, user: action.payload};
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
          
          await dispatch({type: 'login', payload: response.data.token})
          await dispatch({type: 'setUser', payload: response.data.user})
          
          // Set user interests chat groups to state
          const chatGroups = await userInterests(response.data.user);
          await dispatch({type: 'userInterests', payload: chatGroups});

          // Populate interests to review for admin
          const review = await getReviewInterests();
          await dispatch({type: 'reviewInterests', payload: review})

        } else if (response.data.isMatch == false) {
          await dispatch({type: 'add_error', payload: 'Password is incorrect'})
        }
      } catch (err) {
        await dispatch({type: 'add_error', payload: 'Something went wrong with signin'})
      }
    };
  };

const signout = (dispatch) => async () => {
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

async function getReviewInterests() {
  const response = await trackerApi.get("/api/interests/getAllInterests")
  const listOfInterests = response.data;
  let interestsToReview = []
  // Loop through all interests to find matches.
  for(let i = 0; i < listOfInterests.length; i++) {
    if (listOfInterests[i].review == true) {
      interestsToReview.push(listOfInterests[i]);
    }
  }
  return interestsToReview
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


const addUserInterests = (dispatch) => async (newUser) => {
  try {
    
    addToInterests(newUser);

  } catch (err) {


    await dispatch({type: 'add_error', payload: ''})
  }
};



export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, getInterests, addUserInterests},
  { token: null, errorMessage: '', user: null, interests: null}
);




    