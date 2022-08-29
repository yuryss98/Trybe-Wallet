import {
  ADD_EMAIL,
  REQUEST_SUCESS,
  REQUEST_FAILURE,
  ADD_EXPENSES,
  SUM_EXPENSES,
} from './actionsTypes';

export const actionAddEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

const actionSumExpenses = (expenses, currency, value) => {
  const objectValues = Object.values(expenses.exchangeRates);
  const currencySelected = objectValues.find((curr) => curr.code === currency);
  const sumValues = currencySelected.ask * Number(value);

  return {
    type: SUM_EXPENSES,
    sumValues,
  };
};

export const actionAddExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: {
    ...expenses,
  },
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

export const fetchingExchangeRates = (expense, currency, value) => async (dispatch) => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    const newExpense = {
      ...expense,
      exchangeRates: data,
    };

    dispatch(actionAddExpenses(newExpense));
    dispatch(actionSumExpenses(newExpense, currency, value));
  } catch (error) {
    dispatch(actionRequestFailure(error.message));
  }
};
