import {
  REQUEST_SUCESS,
  REQUEST_FAILURE,
  ADD_EXPENSES,
  SUM_EXPENSES,
  REMOVE_EXPENSE,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [''],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
  sumExpenses: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const {
    sucess,
    error,
    payload,
    sumValues,
    expense,
  } = action;

  switch (action.type) {
  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: sucess.filter((key) => key !== 'USDT'),
    };

  case REQUEST_FAILURE:
    return {
      ...state,
      error,
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };

  case SUM_EXPENSES:
    return {
      ...state,
      sumExpenses: state.sumExpenses + Number(sumValues),
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((test) => test !== expense),
      sumExpenses: state.sumExpenses - Number(sumValues),
    };

  default: return state;
  }
};

export default wallet;
