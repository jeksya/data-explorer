import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeContext } from './context/theme.js';

const WrapAppWithTheme = () => {
	return (
		<ThemeContext>
			<App />
		</ThemeContext>
	)
}

ReactDOM.render(
	<WrapAppWithTheme />,
	document.getElementById('root')
);
