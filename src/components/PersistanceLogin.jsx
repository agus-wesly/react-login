import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useLogin from "../hooks/useLogin";
import { Outlet } from "react-router-dom";

const PersistanceLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persistance } = useLogin();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return !persistance ? <Outlet /> : loading ? <p>Loading...</p> : <Outlet />;
};

export default PersistanceLogin;
