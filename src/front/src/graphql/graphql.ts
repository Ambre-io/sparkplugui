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
