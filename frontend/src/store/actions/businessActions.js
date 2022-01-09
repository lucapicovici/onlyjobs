import {
  BUSINESS_LIST_REQUEST,
  BUSINESS_LIST_FAIL,
  BUSINESS_LIST_SUCCESS,
  BUSINESS_DETAILS_REQUEST,
  BUSINESS_DETAILS_SUCCESS,
  BUSINESS_DETAILS_FAIL
} from '../constants/businessConstants';
import axios from 'axios';

export const listBusinesses = (pageNumber, keyword, city, domain) => async(dispatch) => {
  try {
    dispatch({ type: BUSINESS_LIST_REQUEST });

    let url = `/api/businesses?pageNumber=${pageNumber}`;

    if (keyword) url = url.concat(`&keyword=${keyword}`);
    if (city) url = url.concat(`&city=${city}`);
    if (domain) url = url.concat(`&domain=${domain}`);

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

export const listBusinessDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BUSINESS_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/businesses/${id}`);

    dispatch({
      type: BUSINESS_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BUSINESS_DETAILS_FAIL,
      payload: error.response?.data.message ?? error.message
    });
  }
};