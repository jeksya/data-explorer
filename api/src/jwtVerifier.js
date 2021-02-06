import OktaJwtVerifier from '@okta/jwt-verifier';

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: "https://dev-3297886.okta.com/oauth2/default",
    clientId: "0oa13znjtm3h9kqxR5d6"
})

export const jwtVerifier = async (request, response, next) => {

    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).send();
    }

    const [authType, token] = authorization.trim().split(' ');

    try {
        const { claims } = await oktaJwtVerifier.verifyAccessToken(token, "api://default")

        if (!claims) {
            return response.status(401).send();
        }
        return next();
    }
    catch (err) {
        console.log(err);
        return response.status(401).send();
    }    
}