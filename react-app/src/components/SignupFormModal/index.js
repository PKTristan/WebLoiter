import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [disabled, setDisabled] = useState(true);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [display_name, setDisplayName] = useState('')
	const [profile_pic, setProfilePic] = useState('');
	const [bio, setBio] = useState('');
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showLoginForm, setShowLoginForm] = useState(false)
	const [showSignupForm, setShowSignupForm] = useState(true)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, display_name, email, password, profile_pic, bio));
			console.log('data', data)
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors([
				{"password": "Confirm Password field must be the same as the Password field"}
			]);
			console.log(errors)
		}
	};

	useEffect(() => {
		if(user) {
			closeModal();
			history.push('/servers');
		}
	}, [user]);

	useEffect(() => {
		if (password  !== confirmPassword) {
			setDisabled(true);
		}
		else {
			setDisabled(false);
		}
	}, [password, confirmPassword]);

	const openLoginForm = () => {
		setShowLoginForm(true);
		setShowSignupForm(false)
	}

	return (
		<div className="signup-container">
			{showLoginForm && (
				errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))
			)}
			{showSignupForm && (
				<div>
				<div className="signup-header">
					<h2>Join Your Friends</h2>
					<img className='group-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Friendly_stickman.svg/400px-Friendly_stickman.svg.png?20110713230618"/>
				</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
						))}
				</ul>
			<form className="signup-form" onSubmit={handleSubmit}>
				<label>

					<input
					placeholder="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						/>
				</label>
				<label>

					<input
					placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						/>
				</label>
				<label>

					<input
					placeholder="Display Name"
						type="text"
						value={display_name}
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
				</label>
				<label style={{ fontWeight: "bold" }}>
					url example: https://i.imgur.com/YnEnRlg.jpg
					<input
					placeholder="Profile Pic"
						type="url"
						value={profile_pic}
						onChange={(e) => setProfilePic(e.target.value)}
						/>
				</label>
				<label>
				<label>

					<textarea
						className="bio_txt"
						placeholder="Tell us about yourself..."
						type="textarea"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						/>
				</label>

					<input
					placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
				</label>
				<label>

					<input
					placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						/>
				</label>
				<button className="signup-submit-btn" disabled={disabled} type="submit">Continue</button>
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
