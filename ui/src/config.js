const PortalConfig = {
	"GRAPHQL": {
		api: process.env.REACT_APP_GRAPHQLAPIURI || window.env.GRAPHQLAPIURI,
	},
	"OIDC": {
		clientId: process.env.REACT_APP_CLIENTID || window.env.CLIENTID,
		issuer: process.env.REACT_APP_ISSUER || window.env.ISSUER,
		redirectUri: process.env.REACT_APP_REDIRECTURI || window.env.REDIRECTURI,
		scope: process.env.REACT_APP_SCOPE || window.env.SCOPE
	}
}
export default PortalConfig;