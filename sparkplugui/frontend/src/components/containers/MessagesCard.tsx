import React, {useEffect, useRef} from 'react';

import Grid from "@mui/material/Unstable_Grid2";
// import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {AppDispatch} from "../../redux/store.ts";
import {constants} from '../../utils/constants.ts';
import {getMessages, setMessages} from "../../redux/data/messagesSlice.ts";
import {getReloadEvent} from "../../redux/events/reloadEventSlice.ts";
import {MessagesType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";
import {theme} from "../../styles/muiTheme.ts";

import {backend} from "../../../wailsjs/go/models.ts";
import {EvtPayload} from "../../../wailsjs/go/backend/App";


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

    EvtPayload().then((message: backend.MQTTMessage) => {
        dispatch(setMessages(message));
    }).catch(e => {
        console.debug('Error: fail to get MQTT Payload:', e);
    });

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
        <AmbreCard title={`${constants.emojiEnvelop} ${t('mqttMessagesTitle')}`} name={constants.messagesCard}>
            <Grid ref={mqttMessagesRef} container sx={messages.length > 0 ? styles.mqttMessagesContainer : undefined}>
                {messages.map(({topic, payload, timestamp}, i) => (
                    <Grid key={`to${i}to`} xs={12} sx={styles.mqttMessages}>
                        <span style={styles.messageDateTime}>{timestamp}</span>
                        {/*<span style={styles.messageDateTime}><Moment>{timestamp}</Moment></span>*/}
                        <div style={styles.mqttTopic}>{topic}</div>
                        <div style={styles.color(theme.palette.primary.dark)}>{payload}</div>
                    </Grid>
                ))}
            </Grid>
        </AmbreCard>
    );
};
