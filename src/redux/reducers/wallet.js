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
  switch (action.type) {
  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: action.sucess.filter((key) => key !== 'USDT'),
    };

  case REQUEST_FAILURE:
    return {
      ...state,
      error: action.error,
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SUM_EXPENSES:
    return {
      ...state,
      sumExpenses: state.sumExpenses + Number(action.sumValues),
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((test) => test !== action.expense),
      sumExpenses: state.sumExpenses - Number(action.sumValues),
    };

  default: return state;
  }
};

export default wallet;
