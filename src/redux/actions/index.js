export const ADD_USER = 'ADD_USER';

// ..........actions...........

export const addUser = (email) => ({
  type: ADD_USER,
  payload: email,
});
