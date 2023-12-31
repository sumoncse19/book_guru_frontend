import { useEffect, useState } from "react";
import "../assets/css/auth/auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../redux/feature/user/userApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/feature/user/userSlice";

const Auth = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLoginClick = () => {
    setIsLoginActive(true);
    navigate("/auth/#login");
  };

  const handleRegisterClick = () => {
    setIsLoginActive(false);
    navigate("/auth/#signup");
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#signup") {
      handleRegisterClick();
    } else if (location.hash === "#login") {
      handleLoginClick();
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }, [location.hash, navigate]);

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiResponse = await signIn({
      email: `${email}`,
      password: `${password}`,
    });
    navigate("/");

    if (apiResponse?.error?.status === 404) {
      console.log(apiResponse.error.data.response);
    } else {
      dispatch(setUser(apiResponse.data.user));
      console.log(apiResponse.data.user, "apiResponse");
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiResponse = await signUp({
      name: `${firstName} ${lastName}`,
      email: `${email}`,
      password: `${password}`,
    });
    if (apiResponse.data?.response === "User already exist") {
      alert(apiResponse.data?.response);
    } else {
      navigate("/auth/#login");
    }

    console.log(apiResponse, "apiResponse");
  };

  return (
    <div className="authBody h-screen flex flex-col justify-center content-center flex-wrap">
      <div className="authWrapper">
        <div className="button-box">
          <div
            className="btn-active-back"
            style={{ left: isLoginActive ? "0px" : "50%" }}
          ></div>
          <button className="toggle-btn login-btn" onClick={handleLoginClick}>
            &nbsp;&nbsp;Login
          </button>
          <button
            className="toggle-btn register-btn"
            onClick={handleRegisterClick}
          >
            &nbsp;&nbsp;Register
          </button>
        </div>

        <div className="form-box">
          <form
            id="login"
            className="login-form"
            onSubmit={handleSignIn}
            style={{ left: isLoginActive ? "0px" : "-115%" }}
          >
            <div className="input-box">
              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-box">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="check-box">
              <input type="checkbox" id="login-remember-checkbox" />
              <label htmlFor="login-remember-checkbox">Remember me</label>
            </div>
            <button className="submit-button">Login</button>
          </form>

          <form
            id="signup"
            className="register-form"
            style={{ left: isLoginActive ? "115%" : "0px" }}
            onSubmit={handleSignUp}
          >
            <div className="input-box">
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-box">
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="input-box">
              <input
                id="regEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-box">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password2">Password</label>
            </div>
            <div className="check-box">
              <input type="checkbox" id="register-remember-checkbox" />
              <label htmlFor="register-remember-checkbox">
                Agree to the terms & conditions
              </label>
            </div>
            <button className="submit-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
