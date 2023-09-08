// PropTypes
import PropTypes from "prop-types";
import { createContext, useReducer, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

const initialState = {
  user: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  AuthContextProvider.propTypes = {
    children: PropTypes.func.isRequired,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  function login(user) {
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  }

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (jwtDecode(user.token).exp * 1000 < Date.now()) {
        // jtw expired
        localStorage.removeItem("user");
        alert("login session has expired");
        logout();
      } else {
        login(user);
      }
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
