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
} from '../reducers/types';


export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const getLogs = () => async dispatch => {
  setLoading();
  const res = await fetch('/logs');
  const data = await res.json();

  dispatch({
    type: GET_LOGS,
    payload: data
  });

};

export const addLog = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

export const deleteLog = (id) => async (dispatch) => {
  try {
    console.log(' deleetlog trigg');
    setLoading();

    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });

  }
  catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }



};


export const updateLog = (log) => async (dispatch) => {
  try {
    console.log(' upd log trigg');
    setLoading();

    let res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let data = await res.json();
    console.log(data);
    dispatch({
      type: UPDATE_LOG,
      payload: data
    });

  }
  catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }



};

export const setCurrentLog = log => {
  console.log(' current log');
  console.log(log);
  return {

    type: SET_CURRENT,
    payload: log

  };
};



// export const setCurrentLog = (log) => async (dispatch) => {
//   try {
//     console.log(' current log');
//     console.log(log);

//     // let res = await fetch('/logs');
//     // let data = res.json()
//     dispatch({
//       type: SET_CURRENT,
//       payload: log
//     });

//   }
//   catch (err) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: err.response.statusText
//     });
//   }



// };





// Clear current log
export const clearCurrent = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_CURRENT

    });
  };
};


export const searchLogs = (search) => async dispatch => {
  setLoading();
  const res = await fetch('/logs?q=' + search);
  const data = await res.json();

  dispatch({
    type: SEARCH_LOGS,
    payload: data
  });

};