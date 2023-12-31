import { useEffect, useState } from "react";
import "../assets/css/auth/auth.css";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
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
  }, [location.hash, navigate]);

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
            style={{ left: isLoginActive ? "0px" : "-115%" }}
          >
            <div className="input-box">
              <input type="email" id="loginEmail" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-box">
              <input type="password" id="password" required />
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
          >
            <div className="input-box">
              <input type="text" id="firstName" required />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-box">
              <input type="text" id="lastName" required />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="input-box">
              <input type="email" id="regEmail" required />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-box">
              <input type="password" id="password2" required />
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
