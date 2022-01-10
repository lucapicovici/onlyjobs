import {
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL
} from '../constants/studentConstants';
import axios from 'axios';

export const listStudentDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/students/${userId}`);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload: error.response?.data.message ?? error.message
    });
  }
};