import axios from "axios";
import {
  CONTRACT_LIST_FAIL,
  CONTRACT_LIST_REQUEST,
  CONTRACT_LIST_SUCCESS,
} from "../constants/contractConstants";

export const listContract = () => async (dispatch) => {
  try {
    dispatch({type: CONTRACT_LIST_REQUEST});

    const { data } = await axios.get(
        ''
    )

    dispatch({
        type: CONTRACT_LIST_SUCCESS,
        payload: data,
    })
  } catch (error) {
    dispatch({
        type: CONTRACT_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.message.data.message : error.message,
    })
  }
};
