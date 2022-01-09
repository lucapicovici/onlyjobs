import {
  BUSINESS_LIST_REQUEST,
  BUSINESS_LIST_FAIL,
  BUSINESS_LIST_SUCCESS,
  BUSINESS_DETAILS_REQUEST,
  BUSINESS_DETAILS_SUCCESS,
  BUSINESS_DETAILS_FAIL,
  SEARCH_CRITERIA
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

export const businessDetailsReducer = (state={ business: {} }, action) => {
  switch(action.type) {
    case BUSINESS_DETAILS_REQUEST:
      return { loading: true, business: {} };
    case BUSINESS_DETAILS_SUCCESS:
      return { 
        loading: false, 
        business: action.payload
      };
    case BUSINESS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchCriteriaReducer = (state={ }, action) => {
  switch(action.type) {
    case SEARCH_CRITERIA:
      return { 
        keyword: action.payload.keyword,
        city: action.payload.city,
        domain: action.payload.domain
       };
    default:
      return state;
  }
};