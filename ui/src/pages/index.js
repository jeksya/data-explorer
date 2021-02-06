import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import PortalConfig from '../config';
import { NotAuthorized } from './messages';
import { useOktaAuth } from '@okta/okta-react';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { GlobalContext } from '../context';
import { GridContext } from '../context/grid.js';
import { useThemeStore } from '../context/theme.js';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './nav';
import Body from './body/';
import Header from './header/index.js';

export const client = accessToken => {
	return new ApolloClient({
		link: new HttpLink({
			uri: `${PortalConfig.GRAPHQL.api}/graphql`,
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}),
		cache: new InMemoryCache(),
	});
};

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
	}
}));

const LandingPage = () => {
	const { theme_color } = useThemeStore();
	const theme = createMuiTheme({
		palette: {
			type: theme_color,
			primary: {
				main: '#ffffff'
			},
			secondary: {
				main: '#181d1f'
			}
		}
	});

	const classes = useStyles();

	const { authState } = useOktaAuth();
	if(!authState.isAuthenticated) return <NotAuthorized />;

	return (
		<div className={classes.root}>
			<ApolloProvider client={client(authState.accessToken)}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<GlobalContext>
						<Header />
						<Nav />
						<GridContext>
							<Body />
						</GridContext>
					</GlobalContext>
				</ThemeProvider>
			</ApolloProvider>
		</div>
	)
}
export default LandingPage;