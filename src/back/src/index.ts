import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {readFileSync} from 'fs';

import CONFIG from '../config.json';
import {resolvers} from "~/graphql/resolvers";

// GraphQL Schema definition
const typeDefs = readFileSync('src/graphql/schema.graphql', {encoding: 'utf-8'});

// HTTP GraphQL Server declaration
const HTTPServer = new ApolloServer({
    typeDefs, // GraphQL schema
    resolvers, // GraphQL query and mutation objects
    status400ForVariableCoercionErrors: true
});

// HTTP GraphQL Server instantiation
(async () => {

    const {url} = await startStandaloneServer(HTTPServer, {
        listen: {
            host: CONFIG.server.host,
            port: CONFIG.server.port
        },
    });

    console.log(`🚀 Server ready at: ${url} 😀`);

})(); // Thank you, Damien Gaillard, for the Self-Invoking Functions that bypass 'await at top level'
