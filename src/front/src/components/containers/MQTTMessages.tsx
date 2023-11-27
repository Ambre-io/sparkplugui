import React, {useEffect, useRef} from 'react';

import {Collapse} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useDispatch, useSelector} from "react-redux";
import {useSubscription} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AppDispatch} from "../../redux/store";
import {getMessages, setMessages} from "../../redux/data/messagesSlice";
import {getReloadEvent} from "../../redux/events/reloadEventSlice";
import {MessagesType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {WS_MESSAGE_RECEIVED} from '../../graphql/graphql';
import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {utils} from "../../utils/utils";
import {theme} from "../../styles/muiTheme";


export const MQTTMessages: React.FC = () => {

    const {t} = useTranslation();

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    // Auto scroll to the bottom
    const mqttMessagesRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (mqttMessagesRef !== null && mqttMessagesRef.current !== null) {
            mqttMessagesRef.current.scrollTop = mqttMessagesRef.current.scrollHeight;
        }
    };

    // Messages slice
    const messages: MessagesType = useSelector(getMessages);
    const dispatch: AppDispatch = useDispatch();

    // Reload on save trick (see explanations in src/redux/reloadOnSaveSlice)
    const reload = useSelector(getReloadEvent);
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
        <Grid container id='MQTTMessages' sx={styles.ambreCard}>
            <Grid sx={styles.width100}>
                <Grid container>
                    <Grid>
                        <AmbreExpandButton
                            expand={expanded}
                            onClick={goExpand}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </AmbreExpandButton>
                    </Grid>
                    <Grid>
                        <p style={styles.title}>📨 {t('mqttMessagesTitle')}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={styles.width100}>
                <Collapse in={expanded} timeout="auto">
                    <Grid ref={mqttMessagesRef} container sx={messages.length > 0 ? styles.mqttMessagesContainer : undefined}>
                        {messages.map(({topic, message, timestamp}, i) => (
                            <Grid
                                key={`to${i}to`}
                                xs={12}
                                sx={styles.mqttMessages}
                            >
                                <div>
                                    <span
                                        style={styles.color(theme.palette.primary.light)}
                                    >
                                        {utils.dateFrom(timestamp)}
                                    </span>
                                    <span style={styles.color(theme.palette.primary.main)}> {topic}</span>
                                </div>
                                <div style={styles.color(theme.palette.primary.dark)}>{message}</div>
                            </Grid>
                        ))}
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
};
