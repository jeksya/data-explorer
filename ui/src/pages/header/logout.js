import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useStyles } from './style';

const Logout = () => {
	const classes = useStyles();
	const { oktaAuth } = useOktaAuth();

	const logout = async () => {
		oktaAuth.tokenManager.clear();
	};

	return (
		<div onClick={logout} className={classes.toolbar} >
			Logout
		</div>
	);
};

export default Logout;