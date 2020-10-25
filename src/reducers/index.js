const loginCred = {
  username: "admin@gmail.com",
  password: "admin@123",
};

const initialState = {
  isLoginCredValid: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "CHECK_LOGIN":
      newState.isLoginCredValid =
        loginCred.username === action.value.value.username &&
        loginCred.password === action.value.value.password;
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
