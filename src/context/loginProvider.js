import { useState, createContext } from "react";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persistance, setPersistance] = useState(JSON.parse(localStorage.getItem("persistance")) || false);

  return <LoginContext.Provider value={{ auth, setAuth, persistance, setPersistance }}>{children}</LoginContext.Provider>;
};

export default LoginContext;
