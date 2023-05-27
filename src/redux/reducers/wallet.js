import { REQUEST_SUCCESS, REQUEST_API, REQUEST_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      loading: false,
      currencies: action.payload,
    };
  case REQUEST_ERROR:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};

export default wallet;
