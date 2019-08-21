import { SET_ALERT, REMOVE_ALERT } from './types';
const crypto = require("crypto");

export const setAlert = (message, type, timeout) => {
  return (dispatch) => {
    const id = crypto.randomBytes(16).toString("hex");
    dispatch({
      type: SET_ALERT,
      payload: {
        id,
        type,
        message
      }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout)
  }
}