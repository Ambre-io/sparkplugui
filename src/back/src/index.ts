import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {WebSocketServer} from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import {readFileSync} from 'fs';

import CONFIG from '../config.json';
import {resolvers} from "~/graphql/resolvers";

// ******************************************
// * Prepare instances
// ******************************************

// GraphQL Schema
const typeDefs = readFileSync('src/graphql/schema.graphql', {encoding: 'utf-8'});
// GraphQLSchema, so HTTP and WebSocket use the same
const schema = makeExecutableSchema({typeDefs, resolvers});
const httpPath = '/graphQL';
const webSocketPath = '/subscriptions';

// Express app
const app = express();
const httpServer = http.createServer(app);

// ******************************************
// * Run Apollo WebSocket Server
// ******************************************

// Creating the WebSocket server
const webSocketServer = new WebSocketServer({
    server: httpServer,
    path: webSocketPath,
});

// Start listening
const webSocketListen = useServer({schema}, webSocketServer);

// ******************************************
// * Run Express HTTP Server
// ******************************************

const httpApolloServer = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({httpServer: httpServer}),
        // Proper shutdown for the WebSocket server
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await webSocketListen.dispose();
                    }
                };
            }
        }
    ],
});

(async () => {

    await httpApolloServer.start();

    app.use(
        httpPath,
        cors<cors.CorsRequest>(),
        bodyParser.json({limit: '50mb'}),
        expressMiddleware(httpApolloServer)
    );

    // Customize server startup
    httpServer.listen({
        host: CONFIG.server.host,
        port: CONFIG.server.port
    }, () => console.log(`🚀 Server ready at: http://${CONFIG.server.host}:${CONFIG.server.port} 😀`));

})();
