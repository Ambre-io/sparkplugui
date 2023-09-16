import React from 'react';

import {Grid} from "@mui/material";
import {useSubscription} from "@apollo/client";

import {styles} from "../../styles/styles";
import {WS_MESSAGE_RECEIVED} from '../../graphql/graphql';


export const MQTTMessages: React.FC = () => {

    const {data, loading} = useSubscription(WS_MESSAGE_RECEIVED);

    if (loading || data === undefined || data.messageReceived === null) return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} md={10} sx={styles.commonMarginBottom}>
                <Grid sx={{flexGrow: 1}} container>
                    <Grid item sx={styles.boxShadowForms}>
                        <p>Nothing to display</p>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} md={10} sx={styles.commonMarginBottom}>
                <Grid sx={{flexGrow: 1}} container>
                    <Grid item sx={styles.boxShadowForms}>
                        <h4>Topic: {!loading && data.messageReceived !== null && data}</h4>;
                        <p>Message: {!loading && data.messageReceived !== null && data}</p>;
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
