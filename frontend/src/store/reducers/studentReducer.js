import {
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_APPLY_REQUEST,
  STUDENT_APPLY_FAIL,
  STUDENT_APPLY_SUCCESS
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

export const studentApplyReducer = (state = {}, action) => {
  switch(action.type) {
    case STUDENT_APPLY_REQUEST:
      return { loading: true };
    case STUDENT_APPLY_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case STUDENT_APPLY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};