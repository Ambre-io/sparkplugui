import React, {useEffect, useRef} from 'react';

import Grid from "@mui/material/Unstable_Grid2";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {useSubscription} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {AppDispatch} from "../../redux/store.ts";
import {getMessages, setMessages} from "../../redux/data/messagesSlice.ts";
import {getReloadEvent} from "../../redux/events/reloadEventSlice.ts";
import {MessagesType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";
import {WS_MESSAGE_RECEIVED} from '../../graphql/graphql.ts';
import {theme} from "../../styles/muiTheme.ts";
import { constants } from '../../utils/constants.ts';


export const MessagesCard: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const {t} = useTranslation();

    const messages: MessagesType = useSelector(getMessages);
    // Reload on save trick (see explanations in src/redux/reloadOnSaveSlice)
    const reload = useSelector(getReloadEvent);

    // Auto scroll to the bottom
    const mqttMessagesRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (mqttMessagesRef !== null && mqttMessagesRef.current !== null) {
            mqttMessagesRef.current.scrollTop = mqttMessagesRef.current.scrollHeight;
        }
    };

    // FIXME change this Apollo websocket subscription to a Tauri one
    const {data, loading} = useSubscription(WS_MESSAGE_RECEIVED, {
        variables: {
            reload,
            shouldResubscribe: true
        }
    });

    useEffect(() => {
        if (!loading && data !== undefined && data.messageReceived !== null) {
            dispatch(setMessages(data.messageReceived));
        }
        scrollToBottom(); // stay at bottom
    }, [data]); // TODO: IDE says to add both dispatch, loading => see if it doesn't add useless rerenders

    // Reaching the absolute bottom
    useEffect(() => {
        const mqttMessages = mqttMessagesRef.current;
        if (mqttMessages !== null) {
            mqttMessages.addEventListener('DOMNodeInserted', scrollToBottom);
            return () => {
                mqttMessages.removeEventListener('DOMNodeInserted', scrollToBottom);
            };
        }
    }, []);

    return (
        <AmbreCard title={`${constants.emojiEnvelop} ${t('mqttMessagesTitle')}`} name={constants.cards.messagesCard}>
            <Grid ref={mqttMessagesRef} container sx={messages.length > 0 ? styles.mqttMessagesContainer : undefined}>
                {messages.map(({topic, message, timestamp}, i) => (
                    <Grid key={`to${i}to`} xs={12} sx={styles.mqttMessages}>
                        {/*FIXME TypeError: undefined is not an object (evaluating 'e4.duration.format = k')*/}
                        {/*<span style={styles.messageDateTime}><Moment>{timestamp}</Moment></span>*/}
                        <div style={styles.mqttTopic}>{topic}</div>
                        <div style={styles.color(theme.palette.primary.dark)}>{message}</div>
                    </Grid>
                ))}
            </Grid>
        </AmbreCard>
    );
};
