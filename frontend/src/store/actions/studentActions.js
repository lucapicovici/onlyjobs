import {
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_APPLY_FAIL,
  STUDENT_APPLY_REQUEST,
  STUDENT_APPLY_SUCCESS
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

export const studentApply = ({ businessId, studentUserId, name, cv, offer }) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_APPLY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `/api/students/apply/${businessId}`,
      { studentUserId, name, cv, offer },
      config
    );

    dispatch({
      type: STUDENT_APPLY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: STUDENT_APPLY_FAIL,
      payload: error.response?.data.message ?? error.message
    });
  }
}