import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import PortalConfig from './config';
import LandingPage from './pages';

const App = () => {
	return (
		<div className="dataexplorer">
			<BrowserRouter>
				<Security
					issuer={PortalConfig.OIDC.issuer}
					client_id={PortalConfig.OIDC.clientId}
					scope={PortalConfig.OIDC.scope.split(' ')}
					redirect_uri={PortalConfig.OIDC.redirectUri}
					pkce={false}
				>
					<Switch>
						<SecureRoute exact path="/" component={LandingPage} />
						<Route path="/authorization-code/callback" component={LoginCallback} />
						<SecureRoute path="/:pathParam1?/:pathParam2?/:pathParam3?/:pathParam4?/:pathParam5?" component={LandingPage} />
					</Switch>
				</Security>
			</BrowserRouter>
		</div>
	)
}
export default App;
