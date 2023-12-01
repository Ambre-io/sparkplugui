import {ApolloClient, InMemoryCache, gql, HttpLink, split} from '@apollo/client';
import {getMainDefinition} from "@apollo/client/utilities";
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';

import SETTINGS from '../../../settings.json';


// ******************************************
// * CLIENT
// ******************************************
// TODO Authenticate
const httpLink = new HttpLink({
    uri: `${SETTINGS.server.http}://${SETTINGS.server.host}:${SETTINGS.server.port}/${SETTINGS.server.apiPath}`
});

// TODO Authenticate : https://www.apollographql.com/docs/react/data/subscriptions/#5-authenticate-over-websocket-optional
const wsLink = new GraphQLWsLink(createClient({
    url: `${SETTINGS.server.ws}://${SETTINGS.server.host}:${SETTINGS.server.port}/${SETTINGS.server.webSocketPath}`,
}));

// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return ( // true or false
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink, // true
    httpLink, // false
);

// If you provide the link option, it takes precedence over the uri option
// (uri sets up a default HTTP link chain using the provided URL).
export const HTTPClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(), // FIXME @@@ /!\ in memory use in electron app
});

// ******************************************
// * QUERIES
// ******************************************

// ******************************************
// * MUTATIONS
// ******************************************
export const POST_MQTTDATA = gql`
    mutation PostMQTTData(
        $host: String,
        $port: String,
        $username: String,
        $password: String,
        $topic: String,
    ) {
        postMQTTData(
            host: $host,
            port: $port,
            username: $username,
            password: $password,
            topic: $topic,
        ) {
            isOK
        }
    }
`;

// ******************************************
// * SUBSCRIPTIONS
// ******************************************
export const WS_MESSAGE_RECEIVED = gql`
    subscription MessageReceived {
        messageReceived {
            topic
            message
            timestamp
        }
    }
`;
