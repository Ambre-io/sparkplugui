import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {readFileSync} from 'fs';

import CONFIG from '../config.json';
import {resolvers} from "~/graphql/resolvers";


// Express app
const app = express();
const HTTPServer = http.createServer(app);

// GraphQL Schema definition
const typeDefs = readFileSync('src/graphql/schema.graphql', {encoding: 'utf-8'});

// HTTP GraphQL Server declaration
const HTTPApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer: HTTPServer})],
});

(async () => {
    // Ensure we wait for our server to start
    await HTTPApolloServer.start()
    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use(
        '/',
        cors<cors.CorsRequest>(),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        bodyParser.json({limit: '50mb'}),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(HTTPApolloServer, {
            context: async ({req}) => ({token: req.headers.token}),
        }),
    );

    await new Promise<void>((resolve) => HTTPServer.listen({
        host: CONFIG.server.host,
        port: CONFIG.server.port
    }, resolve))
    console.log(`🚀 Server ready at: http://${CONFIG.server.host}:${CONFIG.server.port} 😀`);
})();
