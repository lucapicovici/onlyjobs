import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer
} from './reducers/userReducer';
import { 
  businessListReducer,
  businessDetailsReducer,
  searchCriteriaReducer
} from './reducers/businessReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  businessList: businessListReducer,
  businessDetails: businessDetailsReducer,
  searchCriteria: searchCriteriaReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null;

const searchCriteriaFromStorage = localStorage.getItem('searchCriteria')
  ? JSON.parse(localStorage.getItem('searchCriteria'))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  searchCriteria: searchCriteriaFromStorage
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;