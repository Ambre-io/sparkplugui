import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {expressMiddleware} from '@apollo/server/express4';
import http from 'http';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {readFileSync} from 'fs';
import {useServer} from 'graphql-ws/lib/use/ws';
import {WebSocketServer} from 'ws';

import { MQTTPubSub } from 'graphql-mqtt-subscriptions';

import CONFIG from '../config.json';
import {resolvers} from "~/graphql/resolvers";


// FIXME @@@ it's the client test for graphql-mqtt-subscriptions package
export const pubsub = new MQTTPubSub(); // connecting to mqtt://localhost by default

// ******************************************
// * Prepare instances
// ******************************************

// GraphQL Schema
const typeDefs = readFileSync('src/graphql/schema.graphql', {encoding: 'utf-8'});
// GraphQLSchema, so HTTP and WebSocket use the same
const schema = makeExecutableSchema({typeDefs, resolvers});

// Express app
const app = express();
const httpServer = http.createServer(app);

// ******************************************
// * Run Apollo WebSocket Server
// ******************************************

// Creating the WebSocket server
const webSocketServer = new WebSocketServer({
    server: httpServer,
    path: CONFIG.server.webSocketPath,
});

// Start listening
// options: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#operation-context
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
        CONFIG.server.apiPath,
        cors<cors.CorsRequest>(),
        bodyParser.json({limit: '50mb'}),
        expressMiddleware(httpApolloServer)
    );

    const serverAddress = `http://${CONFIG.server.host}:${CONFIG.server.port}${CONFIG.server.apiPath}`;

    // Customize server startup
    httpServer.listen({
        host: CONFIG.server.host,
        port: CONFIG.server.port
    }, () => console.log(`🚀 Server ready at: ${serverAddress} 😀`));

})();
