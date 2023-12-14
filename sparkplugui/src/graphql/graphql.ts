import {gql} from '@apollo/client';


// ******************************************
// * QUERIES
// ******************************************
export const DISCONNECT = gql`
    query Disconnect {
        disconnect
    }
`;

// ******************************************
// * MUTATIONS
// ******************************************
export const CONNECT = gql`
    mutation Connect(
        $host: String,
        $port: String,
        $username: String,
        $password: String,
        $topic: String,
    ) {
        connect(
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
