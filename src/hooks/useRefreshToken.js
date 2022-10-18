import axios from "../api/axios";
import useLogin from "./useLogin";

const useRefreshToken = () => {
  const { setAuth } = useLogin();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken, roles: response.data.roles };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
