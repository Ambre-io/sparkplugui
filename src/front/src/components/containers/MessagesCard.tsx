import React, {useEffect, useRef} from 'react';

import Grid from "@mui/material/Unstable_Grid2";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {useSubscription} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {AppDispatch} from "../../redux/store";
import {getMessages, setMessages} from "../../redux/data/messagesSlice";
import {getReloadEvent} from "../../redux/events/reloadEventSlice";
import {MessagesType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {WS_MESSAGE_RECEIVED} from '../../graphql/graphql';
import {theme} from "../../styles/muiTheme";
import { constants } from '../../utils/constants';


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
    }, [data]);

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
        <AmbreCard title={`${constants.emojiEnvelop} ${t('mqttMessagesTitle')}`}>
            <Grid ref={mqttMessagesRef} container sx={messages.length > 0 ? styles.mqttMessagesContainer : undefined}>
                {messages.map(({topic, message, timestamp}, i) => (
                    <Grid key={`to${i}to`} xs={12} sx={styles.mqttMessages}>
                        <span style={styles.mqttDateTime}>
                            <Moment style={styles.mqttMoment}>{timestamp}</Moment>
                        </span>
                        <div style={styles.mqttTopic}>{topic}
                        </div>
                        <div style={styles.color(theme.palette.primary.dark)}>{message}</div>
                    </Grid>
                ))}
            </Grid>
        </AmbreCard>
    );
};
