import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";
import { CardTitle, Label } from "reactstrap";
import { Alert } from "reactstrap";
import "./style.scss";
import Cookies from "universal-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LOGIN_URL = "/api/v2/user_login";

const Login = ({ handleLoginPage }) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setUser] = useState("admin@vian-dev.esthenos.com");
  const [password, setPwd] = useState("adminadmin");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const cookies = new Cookies();
  const [state1, setState1] = useState(false);
  const toggleBtn1 = () => {
    setState1((prevState) => !prevState);
  };
  useEffect(() => {
    userRef.current.focus();
    const ckyCheck = cookies.get("user");
    refreshLoginPage(ckyCheck);
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const refreshLoginPage = (ckyCheck) => {
    if (ckyCheck) {
      handleLoginPage(false);
      return;
    } else {
      handleLoginPage(true);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      if (response && response.status === 200) {
        console.log("logged in");
        setSuccess(true);
        handleLoginPage(success);
        const accessToken = response?.data?.message;
        cookies.set("user", accessToken, {
          path: "/",
          expires: new Date(Date.now() + 1200000),
        });
        return;
      }
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.results?.token;
      setAuth({ email, password, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err?.response?.data?.results?.message);
      } else if (err.response?.status === 401) {
        setErrMsg(err?.response?.data?.results?.message);
      } else if (err.response?.status === 500) {
        setErrMsg(err?.response?.data?.results?.error);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className="w-100 h-100 overflow-hidden">
        <div className="row d-flex align-items-center justify-content-center vh-100">
          <div className="background-design" />
          <div className="px-2 p-lg-3 login-form-background">
            <div className="px-xl-2 px-lg-2 p-md-2 p-sm-2 p-2 mx-auto col-12">
              <CardTitle
                tag="h2"
                className="fw-bold mb-2"
                style={{ fontWeight: 600 }}
              >
                Welcome to VIAN! 💫
              </CardTitle>

              {errMsg === "" ? (
                <></>
              ) : (
                <div
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  <Alert color="danger">
                    <div className="alert-body">{errMsg}</div>
                  </Alert>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between mb-1">
                  <label className="form-label hidden" htmlFor="username">
                    Username:
                  </label>
                  <input
                    className="input-field"
                    type="email"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={email}
                    placeholder="Email or Username..."
                    required
                  />
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <Label className="form-label hidden" for="password">
                    Password:
                  </Label>
                  <input
                    className="input-field"
                    type={state1 ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    placeholder="Password..."
                    autoComplete="off"
                    required
                  />
                  <span className="eye-class" onClick={toggleBtn1}>
                    {state1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
                <div
                  id="container"
                  className="d-flex justify-content-center mt-2"
                >
                  <button className="learn-more">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Login</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
