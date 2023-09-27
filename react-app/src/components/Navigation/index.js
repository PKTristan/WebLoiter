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
					<NavLink to={`/servers`} className="server-links">
						Servers
					</NavLink>
			);
		}
	}

	return (
		<div className='navigation-container'>
		<h1>WEBLOITER</h1>
		<ul>
			{isLoaded && (
				<div className='server-profile'> 
					<div className='all-servers'>
						{renderServer()}
					</div>
					<div className='profile-button-container'>
						<li>
							<ProfileButton user={sessionUser} />
						</li>
					</div>
				</div>
			)}
		</ul>
		</div>
	);
}

export default Navigation;
