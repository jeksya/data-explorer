import cors from 'cors';
import express from 'express';
import compression from 'compression';
import { jwtVerifier } from './jwtVerifier.js';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema/index.js';
import resolvers from './resolvers/index.js';
import models from './models/index.js';

const app = express();

app.use(cors());
const ensureAuthenticated = (request, response, next) => {
    return jwtVerifier(request, response, next);
}
app.use(ensureAuthenticated);

const shouldCompress = (req, res) => {
  // don't compress responses if this request header is present
    return req.headers['x-no-compression'] ? false : compression.filter(req, res);
};
  
app.use(compression({
    filter: shouldCompress,
    threshold: 0
}));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: { models }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});