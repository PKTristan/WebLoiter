import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(true)
	const [showSignupForm, setShowSignupForm] = useState(false)
  const { closeModal } = useModal();
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/servers");
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/servers");
    }
  };

  const openSignupForm = () => {
		setShowLoginForm(false);
		setShowSignupForm(true);
	}

  return (
    <>
      {showLoginForm && (
        <div className="sign-in-box">
        <h2>Welcome Back</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)}}
            required
            />
        </label>
        <button className="login-submit-btn" type="submit">Log In</button>
        <button className="demo-btn" type="button" onClick={demoLogin}>Demo User</button>
      </form>
      <button className="signup-redirect-btn" onClick={openSignupForm}>
				Don't have an account?
			</button>
			<div className="terms-div">
				By logging in, you agree to Webloiter's Terms of service and Privacy Policy
			</div>
      </div>
        )}

      {showSignupForm && (
        <div className="signup-form-modal-container">
          <SignupFormModal />
        </div>
      )}

    </>
  );
}

export default LoginFormModal;
