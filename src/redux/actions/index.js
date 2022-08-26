import { ADD_EMAIL, REQUEST_SUCESS, REQUEST_FAILURE } from './actionsTypes';

export const actionAddEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

const actionRequestSucess = (sucess) => ({
  type: REQUEST_SUCESS,
  sucess,
});

const actionRequestFailure = (error) => ({
  type: REQUEST_FAILURE,
  error,
});

export const fetchingCurrenciesThunk = () => async (dispatch) => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    const keys = Object.keys(data);
    dispatch(actionRequestSucess(keys));
  } catch (error) {
    dispatch(actionRequestFailure(error.message));
  }
};
