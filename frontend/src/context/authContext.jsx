import { useEffect, useReducer } from "react";
import { authActionTypes } from "./contextActionTypes.js";
import { AuthContext, authReducer } from "./authContextSetup.js";

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: authActionTypes.LOGIN, payload: user });
    }
  }, []);

  console.log("AuthContext state:", state); // Debugging log

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
