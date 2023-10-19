import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useSubscription} from "@apollo/client";

import {AppDispatch} from "../../redux/store";
import {getMessages, setMessages} from "../../redux/data/messagesSlice";
import {getReloadEvent, initReloadEventSlice} from "../../redux/events/reloadEventSlice";
import {MessagesType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {WS_MESSAGE_RECEIVED} from '../../graphql/graphql';


export const MQTTMessages: React.FC = () => {

    // Reload on save trick (see explanations in src/redux/reloadOnSaveSlice)
    const reloadOnSave = useSelector(getReloadEvent);
    const {data, loading} = useSubscription(WS_MESSAGE_RECEIVED, {
        variables: {
            reloadOnSave: reloadOnSave,
            shouldResubscribe: true
        }
    });
    const information: MessagesType = useSelector(getMessages);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!loading && data !== undefined && data.messageReceived !== null) {
            dispatch(setMessages(data.messageReceived));
        }
    }, [data]);

    if (loading || data === undefined || data.messageReceived === null) return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} md={10} sx={styles.commonMarginBottom}>
                <Grid sx={styles.mqttMessagesContainer} container justifyContent='center'>
                    <Grid item>
                        <p>Nothing to display</p>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <Grid sx={{flexGrow: 1}} container justifyContent='center'>
            <Grid item xs={11} md={10}>
                <Grid sx={styles.mqttMessagesContainer} container>
                    {information.map(({topic, payload}, i) => (
                        <Grid key={`to${i}to`} item xs={12} sx={styles.mqttMessages}>
                            <div>TODO add date</div>
                            <div>{topic}</div>
                            <div>{payload}</div>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
