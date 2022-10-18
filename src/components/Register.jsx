import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleInfo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Register = () => {
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [checkPwd, setCheckPwd] = useState("");
  const [checkPwdFocus, setCheckPwdFocus] = useState(false);
  const [validCheckPwd, setValidCheckPwd] = useState(false);

  const regURL = "/register";
  const USER_REGEX = /^[A-Za-z][a-z0-9]{3,8}$/;
  const PASS_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,9}$/;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const match = USER_REGEX.test(user);
    setValidUser(match);
  }, [user]);

  useEffect(() => {
    const match = PASS_REGEX.test(pwd);
    setValidPwd(match);
    const matchPwd = pwd === checkPwd;
    setValidCheckPwd(matchPwd);
  }, [pwd, checkPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, checkPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validUser || !validPwd) {
      setErrMsg("Error");
      return;
    }
    try {
      const response = await axios.post(regURL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data.message);
      } else {
        setErrMsg("Register failed");
      }
    }
  };

  return (
    <>
      <section>
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <h3>Register Account</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <span className={validUser ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={!validUser && user ? "invalid" : "hide"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input type="text" id="username" autoComplete="off" value={user} onChange={(e) => setUser(e.target.value)} onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} ref={userRef} />
          <p className={!validUser && user && userFocus ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faCircleInfo} />
            4 to 9 characters. <br />
            Must begin with a letter. <br />
            Letters and numbers are allowed.
          </p>

          <label htmlFor="password">
            Password
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={!validPwd && pwdFocus ? "invalid" : "hide"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />
          <p className={!validPwd && pwdFocus ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faCircleInfo} />
            4 to 9 characters. <br />
            Must include at least one capital, number, and letter. <br />
          </p>

          <label htmlFor="checkPwd">
            Confirm Password
            <span className={validCheckPwd && checkPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={!validCheckPwd && checkPwdFocus ? "invalid" : "hide"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input type="password" id="checkPwd" onChange={(e) => setCheckPwd(e.target.value)} onFocus={() => setCheckPwdFocus(true)} onBlur={() => setCheckPwdFocus(false)} />
          <p className={!validCheckPwd && checkPwdFocus ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faCircleInfo} />
            Must match the password <br />
          </p>
          <button disabled={!validUser || !validPwd || !validCheckPwd ? true : false}>Register</button>
        </form>
      </section>
    </>
  );
};

export default Register;
