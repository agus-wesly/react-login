import useLogin from "./useLogin";
import axios from "../api/axios";

const useLogout = () => {
  const { setAuth } = useLogin();

  const logout = async () => {
    try {
      setAuth({});
      const response = axios.get("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
