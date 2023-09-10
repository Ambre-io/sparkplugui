// Client: GraphQL Client, Queries and Mutations using Apollo: https://www.apollographql.com/docs/react/

import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import CONFIG from '../../config.json';

// ******************************************
// * CLIENT
// ******************************************
export const client = new ApolloClient({
    uri: CONFIG.serverAddress,
    cache: new InMemoryCache(),
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
        )
    }
`;
