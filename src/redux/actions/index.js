export const ADD_USER = 'ADD_USER';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_EXPENSES_SUCCESS = 'REQUEST_EXPENSES_SUCCESS';
export const REQUEST_DELETE_EXPENSE = 'REQUEST_DELETE_EXPENSE';

// ..........actions...........

export const addUser = (email) => ({
  type: ADD_USER,
  payload: email,
});

const requestApi = () => ({
  type: REQUEST_API,
});

const requestCurrenciesSuccess = (payload) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload,
});

const requestError = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const getCurrenciesApi = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const moedas = Object.keys(await data).filter((moeda) => moeda !== 'USDT');
    dispatch(requestCurrenciesSuccess(moedas));
  } catch (error) {
    dispatch(requestError());
  }
};

const requestExpensesSuccess = (payload) => ({
  type: REQUEST_EXPENSES_SUCCESS,
  payload,
});

export const getExpensesApi = (expenses) => async (dispatch) => {
  dispatch(requestApi());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    expenses.exchangeRates = await data;

    dispatch(requestExpensesSuccess(expenses));
  } catch (error) {
    dispatch(requestError());
  }
};

export const requestDeleteExpense = (idExpense, valueExpense) => ({
  type: REQUEST_DELETE_EXPENSE,
  idExpense,
  valueExpense,
});
