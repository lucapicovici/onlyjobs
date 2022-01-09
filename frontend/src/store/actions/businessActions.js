import {
  BUSINESS_LIST_REQUEST,
  BUSINESS_LIST_FAIL,
  BUSINESS_LIST_SUCCESS
} from '../constants/businessConstants';
import axios from 'axios';

export const listBusinesses = (pageNumber, keyword) => async(dispatch) => {
  try {
    dispatch({ type: BUSINESS_LIST_REQUEST });

    let url;

    if (keyword) url = `/api/businesses?pageNumber=${pageNumber}&keyword=${keyword}`;
    else url = `/api/businesses?pageNumber=${pageNumber}`;

    const { data } = await axios.get(url);

    dispatch({
      type: BUSINESS_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BUSINESS_LIST_FAIL,
      payload: error.response?.data.message ?? error.message
    });
  }
};