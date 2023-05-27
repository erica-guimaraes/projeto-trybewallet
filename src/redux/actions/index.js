export const ADD_USER = 'ADD_USER';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_ERROR = 'REQUEST_ERROR';

// ..........actions...........

export const addUser = (email) => ({
  type: ADD_USER,
  payload: email,
});

const requestApi = () => ({
  type: REQUEST_API,
});

const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

const requestError = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const getCurrenciesApi = () => async (dispatch) => {
  try {
    dispatch(requestApi());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const moedas = Object.keys(data).filter((moeda) => moeda !== 'USDT');
    dispatch(requestSuccess(moedas));
  } catch (error) {
    dispatch(requestError());
  }
};
