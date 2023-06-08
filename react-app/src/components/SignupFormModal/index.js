import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [displayname, setDisplayName] = useState('')
	const [profile_pic, setProfilePic] = useState('');
	const [bio, setBio] = useState('');
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showLoginForm, setShowLoginForm] = useState(false)
	const [showSignupForm, setShowSignupForm] = useState(true)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, displayname, email, password, profile_pic, bio));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const openLoginForm = () => {
		setShowLoginForm(true);
		setShowSignupForm(false)
	}

	return (
		<div>
			{showSignupForm && (
				<div>
				<h2>Create an account</h2>
			<form className="signup-form" onSubmit={handleSubmit}>
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
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						/>
				</label>
				<label>
					Profile Pic
					<input
						type="url"
						value={profile_pic}
						onChange={(e) => setProfilePic(e.target.value)}
						/>
				</label>
				<label>
					Bio
					<textarea className="bio_txt"
						type="textarea"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						/>
				</label>
				<button className="signup-submit-btn" type="submit">Continue</button>
			</form>
			<button className="login-redirect-btn" onClick={openLoginForm}>
				<Link className="login-redirect-btn" to='/login'>Already have an account?</Link>
			</button>
			<div className="terms-div">
				By registering, you agree to Webloiter's Terms of service and Privacy Policy
			</div>
				</div>
				)}

			{showLoginForm && (
				<div className="login-form-modal-container">
					<LoginFormModal />
					</div>
			)}
			</div>
	);
}

export default SignupFormModal;