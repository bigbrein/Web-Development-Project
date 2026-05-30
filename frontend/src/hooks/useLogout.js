import { useAuthContext } from "./useAuthContext.js";
import { authActionTypes } from "../context/contextActionTypes.js";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: authActionTypes.LOGOUT });
  };

  return { logout };
};
