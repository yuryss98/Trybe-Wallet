import {
  ADD_EMAIL,
  REQUEST_SUCESS,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
  REQUEST_FAILURE,
  EDIT_EXPENSE,
  EDITED_EXPENSE,
} from './actionsTypes';

export const actionEditedExpense = (payload) => ({
  type: EDITED_EXPENSE,
  payload,
});

export const actionEditExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const actionAddEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const actionAddExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: {
    ...expenses,
  },
});

export const actionRemoveExpenses = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});

const requestCurrenciesSucess = (sucess) => ({
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
    dispatch(requestCurrenciesSucess(keys));
  } catch (error) {
    dispatch(actionRequestFailure(error.message));
  }
};

export const fetchingExchangeRates = (expense) => async (dispatch) => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    const newExpense = {
      ...expense,
      exchangeRates: data,
    };
    dispatch(actionAddExpenses(newExpense));
  } catch (error) {
    dispatch(actionRequestFailure(error.message));
  }
};
