import { useContext } from "react";
import loginContext from "../context/loginProvider";

const useLogin = () => {
  return useContext(loginContext);
};

export default useLogin;
