import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const createEvent =
  (dispatch) =>
  async ({ title, location, desc }) => {
    try {
      const response = await trackerApi.post("/signup", {
        title,
        location,
        desc,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { createEvent },
  {}
);
