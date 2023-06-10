import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navigation-container'>
		<h1>WEBLOITER</h1>
		<ul>
			{isLoaded && (
				<div className='profile-button-container'>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				</div>
			)}
		</ul>
		</div>
	);
}

export default Navigation;
