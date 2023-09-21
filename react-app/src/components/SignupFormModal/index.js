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
	console.log('this is errors', errors)

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
				"password: Confirm Password field must be the same as the Password field"
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
		if (!password.length || !confirmPassword.length || (password !== confirmPassword)) {
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

	function isEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function isURL(url) {
		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	}

	// useEffect(() => {
	// 	let errors = [];

	// 	if (!username.length) {
	// 		errors.push('username field is required');
	// 	}

	// 	if (!isEmail(email)) {
	// 		errors.push('email field is invalid');
	// 	}

	// 	if (!display_name.length) {
	// 		errors.push('display name field is required');
	// 	}

	// 	if (!password.length) {
	// 		errors.push('password field is required');
	// 	}

	// 	if(!confirmPassword.length) {
	// 		errors.push('confirm password field is required');
	// 	}

	// 	if (password !== confirmPassword) {
	// 		errors.push('password: Confirm Password field must be the same as the Password field');
	// 	}

	// 	if (!isURL(profile_pic)) {
	// 		errors.push('profile pic field is not valid url');
	// 	}

	// 	setErrors(errors);
	// }, [username, display_name, email, password, confirmPassword, profile_pic]);

	return (
		<div className="signup-container">
			{showSignupForm && (
			<>
				<div className="signup-header">
						<h2>Join Your Friends</h2>
						<img className='group-img' alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Friendly_stickman.svg/400px-Friendly_stickman.svg.png?20110713230618"/>
					</div>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
							))}
					</ul>
				<form className="signup-form" onSubmit={handleSubmit}>
				<div className="signup-form-grid">
					<label>
							Email:
						<input
						placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
							Username:
						<input
							placeholder="Username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<label>
							Display Name:
						<input
							placeholder="Display Name"
							type="text"
							value={display_name}
							onChange={(e) => setDisplayName(e.target.value)}
							required
						/>
					</label>
					<label>
						Profile Pic:
						<input
							placeholder="ex:https://i.imgur.com/YnEnRlg.jpg"
							label="image url must be from imgur.com"
							type="url"
							value={profile_pic}
							onChange={(e) => setProfilePic(e.target.value)}
						/>
						<div className="url-valid-note">
							(image url must be from imgur.com)
							</div>
					</label>
					<label>
						Bio:
						<textarea
							className="bio_txt"
							placeholder="Tell us about yourself..."
							type="textarea"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							/>
					</label>
					<div className="passwords">
					<label>
							Password:
						<input
						placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label>
							Confirm Password:
						<input
							placeholder="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					</div>
				</div>
					<button className="signup-submit-btn" disabled={disabled} type="submit">Continue</button>
				</form>
					<button className="login-redirect-btn" onClick={openLoginForm}>
						<Link className="login-redirect-btn" to='/login'>Already have an account?</Link>
					</button>
				<div className="terms-div">
					By registering, you agree to Webloiter's Terms of service and Privacy Policy
				</div>
				</>
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
