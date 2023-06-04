import { AUTH } from "../../constants/actionTypes"; // this are all type we are exporting for redux reducer
import * as api from "../../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // login in the user...
    const { data } = await api.signIn(formData);

    dispatch({
      type: AUTH,
      data,
    });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    // sign up the user...
    const { data } = await api.signUp(formData);

    dispatch({
      type: AUTH,
      data,
    });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
