import {
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL
} from '../constants/studentConstants';

export const studentDetailsReducer = (state={ student: {} }, action) => {
  switch(action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { loading: true, student: {} };
    case STUDENT_DETAILS_SUCCESS:
      return { 
        loading: false, 
        student: action.payload
      };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};