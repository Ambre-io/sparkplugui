import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";

import JsonView from '@uiw/react-json-view';
// @ts-ignore
import {githubLightTheme} from '@uiw/react-json-view/githubLight';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {constants} from "../../utils/constants.ts";
import {getLastMessages} from "../../redux/data/lastMessagesSlice.ts";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice.ts";
import {styles} from "../../styles/styles.ts";
import {utils} from "../../utils/utils.ts";

import {core} from "../../../wailsjs/go/models.ts";


const initMessage = {topic: '', payload: '', timestamp: 0};

export const LastMessageCard: React.FC = () => {
    const {t} = useTranslation();

    const [message, setMessage] = useState<core.MQTTMessage>(initMessage);

    const selectedTopic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);

    useEffect(() => {
        setMessage(messages[selectedTopic] !== undefined ? messages[selectedTopic] : initMessage);
    }, [selectedTopic, messages]);

    let displayedMessage: any;
    let isParsable: boolean = true;
    try {
        displayedMessage = JSON.parse(message.payload);
    } catch (_) {
        displayedMessage = message.payload;
        isParsable = false;
    }

    return (
        <AmbreCard title={`${constants.emojiFile} ${t('lastMessage')}`}>
            {(message.topic !== '') && (
                <Grid container sx={styles.lastMessage}>
                    <Grid item xs={12}>
                        <span style={styles.messageDateTime}>{utils.locale(message.timestamp)}</span>
                    </Grid>
                    <Grid item xs={12} sx={{userSelect: 'auto', paddingBottom: '5px'}}>
                        <span style={styles.mqttTopic}>{message.topic}</span>
                    </Grid>
                    <Grid item xs={12}>
                        {isParsable ? (
                            <JsonView value={displayedMessage} style={{...githubLightTheme, ...styles.jsonView}}/>
                        ) : (
                            displayedMessage
                        )}
                    </Grid>
                </Grid>
            )}
        </AmbreCard>
    );
};
