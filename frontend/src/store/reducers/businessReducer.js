import {
  BUSINESS_LIST_REQUEST,
  BUSINESS_LIST_FAIL,
  BUSINESS_LIST_SUCCESS
} from '../constants/businessConstants';

export const businessListReducer = (state={ businesses: [] }, action) => {
  switch(action.type) {
    case BUSINESS_LIST_REQUEST:
      return { loading: true, businesses: [] };
    case BUSINESS_LIST_SUCCESS:
      return { 
        loading: false, 
        count: action.payload.count,
        businesses: action.payload.businesses,
        page: action.payload.page,
        pages: action.payload.pages
      }; 
    case BUSINESS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};