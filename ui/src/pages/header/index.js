import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useThemeStore, useThemeDispatch } from '../../context/theme.js';
import WbSunnySharpIcon from '@material-ui/icons/WbSunnySharp';
import { useStyles } from './style';

const Header = () => {
	const classes = useStyles();
	const { theme_color } = useThemeStore();
	const dispatch = useThemeDispatch();
	const onThemeChange = () => {
		return dispatch({
			type: 'CHANGE_THEME',
			payload: theme_color === 'dark' ? 'light' : 'dark'
		});
	}
	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<WbSunnySharpIcon
					className={classes.lightBulb}
					color={theme_color === 'dark' ? 'primary' : 'secondary'}
					onClick={onThemeChange} />
			</Toolbar>
		</AppBar>
	)
}
export default Header;