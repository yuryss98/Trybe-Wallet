import {
  REQUEST_SUCESS,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  EDITED_EXPENSE,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [''],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: action.sucess.filter((key) => key !== 'USDT'),
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((test) => test !== action.expense),
      sumExpenses: state.sumExpenses - Number(action.sumValues),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
      exchangeRates: action.exchangeRates,
    };

  case EDITED_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          const expenseEdited = {
            id: state.idToEdit,
            ...action.payload,
            exchangeRates: {
              ...expense.exchangeRates,
            },
          };
          return expenseEdited;
        }
        return expense;
      }),
      editor: false,
    };
  }
  default: return state;
  }
};

export default wallet;
