import React, {useEffect} from 'react';

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

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    // Messages slice
    const messages: MessagesType = useSelector(getMessages);
    const dispatch: AppDispatch = useDispatch();

    const {t} = useTranslation();

    // Reload on save trick (see explanations in src/redux/reloadOnSaveSlice)
    const reloadOnSave = useSelector(getReloadEvent);
    const {data, loading} = useSubscription(WS_MESSAGE_RECEIVED, {
        variables: {
            reloadOnSave: reloadOnSave,
            shouldResubscribe: true
        }
    });

    useEffect(() => {
        if (!loading && data !== undefined && data.messageReceived !== null) {
            dispatch(setMessages(data.messageReceived));
        }
    }, [data]);

    return (
        <Grid container id='MQTTMessages' sx={styles.ambreCard}>
            <Grid>
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
                        <p style={styles.subtitle}>{t('mqttMessagesTitle')}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={styles.viewPortSize}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container sx={styles.marginTop2}>
                        {messages.map(({topic, message, timestamp}, i) => (
                            <Grid key={`to${i}to`} xs={12}
                                  sx={styles.mqttMessages(theme.palette.primary.main, theme.palette.primary.dark)}>
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
