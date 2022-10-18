import { useState, useEffect, useRef } from "react";
import useLogin from "../hooks/useLogin";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setAuth, persistance, setPersistance } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const LOGIN_URL = "/login";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    localStorage.setItem("persistance", persistance);
  }, [persistance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, accessToken, roles });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response !");
      } else if (err.response?.status === 400) {
        setErrMsg("Username or password required !");
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setErrMsg("Username or Password incorrect !");
      } else {
        console.log(err);
        setErrMsg("Login Failed");
      }
    }
  };

  const togglePersistance = () => {
    setPersistance((prev) => !prev);
  };

  return (
    <>
      <section>
        <p className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} ref={userRef} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={pwd} required onChange={(e) => setPwd(e.target.value)} />
          <div className='persistance'>
            <input type="checkbox" id="persistance" checked={persistance} onChange={togglePersistance} />
            <label htmlFor="persistance">Trust this device ?</label>
          </div>
          <button>Login</button>
        </form>
      </section>
    </>
  );
};

export default Login;
