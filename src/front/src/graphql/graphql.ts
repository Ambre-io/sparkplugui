import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import CONFIG from '../../config.json';

// ******************************************
// * CLIENT
// ******************************************
export const HTTPClient = new ApolloClient({
    uri: CONFIG.serverHTTP,
    cache: new InMemoryCache(),
});

const GraphQLWebSocketLink = new GraphQLWsLink(createClient({
  url: CONFIG.serverWebSocket,
}));

// TODO https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended

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
        )
    }
`;
