import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = () => {
	const theme = createMuiTheme({
		palette: {
			type: "dark"
		},
	});
	return (
		<div>{ theme }</div>
	)
}
export default theme;