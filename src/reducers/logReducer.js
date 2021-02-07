import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      console.log('grt logs reucer');
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      console.log('add logs reucer');
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false
      };
    case DELETE_LOG:
      console.log('del logs reucer');
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== action.payload),
        loading: false
      };
    case UPDATE_LOG:
      console.log('upd log');
      console.log(action.payload)
      return {
        ...state,
        logs: state.logs.map(log =>
          log.id === action.payload.id ? action.payload : log
        ),
        loading: false
      };
    case SEARCH_LOGS:
      console.log('set search log  reducer');
      console.log(action.payload);
      return {
        ...state,
        logs: action.payload
      };
    case SET_CURRENT:
      console.log('set currentreucer');
      console.log(action.payload);
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      console.log(' set loading logs reucer');
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      console.log('default');
      console.log(action);
      return state;
  }
};