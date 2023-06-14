import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const renderServer = () => {
		if (sessionUser) {
			return (
				<div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', color: 'black' }}>
					<NavLink to={`/servers`} className='nav-link'>
						Servers
					</NavLink>
				</div>
			);
		}
	}

	return (
		<div className='navigation-container'>
		<h1>WEBLOITER</h1>
		<div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', color: 'black' }}>
			{renderServer()}
		</div>
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
