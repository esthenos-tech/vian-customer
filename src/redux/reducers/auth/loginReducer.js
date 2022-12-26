export const login = (
  state = { userRole: sessionStorage.getItem("user") },
  action
) => {
  switch (action.type) {
    // case "LOGIN_WITH_EMAIL": {
    //   return { ...state, values: action.payload }
    // }
    default: {
      return state;
    }
  }
};
