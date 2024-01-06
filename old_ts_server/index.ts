import {ApolloServer} from "@apollo/old_ts_server";
import {ApolloServerPluginDrainHttpServer} from '@apollo/old_ts_server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {expressMiddleware} from '@apollo/old_ts_server/express4';
import http from 'http';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {readFileSync} from 'fs';
import {useServer} from 'graphql-ws/lib/use/ws';
import {WebSocketServer} from 'ws';

import {redis} from "./database/redis";
import {resolvers} from "./graphql/resolvers";
import SETTINGS from '../sparkplugui/frontend/settings.json';


// ******************************************
// * Redis client
// ******************************************

redis.createClient().finally();

// ******************************************
// * Prepare instances
// ******************************************

// GraphQL Schema
const typeDefs = readFileSync('src/old_ts_server/graphql/schema.graphql', {encoding: 'utf-8'});
// GraphQLSchema, so HTTP and WebSocket use the same
const schema = makeExecutableSchema({typeDefs, resolvers});

// Express app
const app = express();
const httpServer = http.createServer(app);

// ******************************************
// * Run Apollo WebSocket Server
// ******************************************

// Creating the WebSocket old_ts_server
const webSocketServer = new WebSocketServer({
    server: httpServer,
    path: `/${SETTINGS.server.webSocketPath}`,
});

// Start listening
// options: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#operation-context
const webSocketListen = useServer({schema}, webSocketServer);

// ******************************************
// * Run Express HTTP Server
// ******************************************


const httpApolloServer: ApolloServer = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP old_ts_server.
        ApolloServerPluginDrainHttpServer({httpServer: httpServer}),
        // Proper shutdown for the WebSocket old_ts_server
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
        `/${SETTINGS.server.apiPath}`,
        cors<cors.CorsRequest>(),
        bodyParser.json({limit: '50mb'}),
        expressMiddleware(httpApolloServer)
    );

    const httpServerAddress = (
        `${SETTINGS.server.http}://${SETTINGS.server.host}:${SETTINGS.server.port}/${SETTINGS.server.apiPath}`
    );
    const wsServerAddres = (
        `${SETTINGS.server.ws}://${SETTINGS.server.host}:${SETTINGS.server.port}/${SETTINGS.server.webSocketPath}`
    );

    // Customize old_ts_server startup
    httpServer.listen({
        host: SETTINGS.server.host,
        port: SETTINGS.server.port
    }, () => {
        console.log(`🚀 HTTP server ready        : 😀 ${httpServerAddress}`);
        console.log(`🧦 WebSocket server ready   : 😎 ${wsServerAddres}`);
    });

})();
