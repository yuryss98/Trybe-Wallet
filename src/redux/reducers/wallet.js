import { REQUEST_SUCESS, REQUEST_FAILURE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [''],
  expenses: [{}],
  editor: false,
  idToEdit: 0,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: action.sucess.filter((key) => key !== 'USDT'),
    };

  case REQUEST_FAILURE: return {
    ...state,
    error: action.error,
  };

  default: return state;
  }
};

export default wallet;
