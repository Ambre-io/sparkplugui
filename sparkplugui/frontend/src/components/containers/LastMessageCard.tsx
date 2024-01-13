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
import {MessageType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";


const initMessage = {topic: '', payload: '', timestamp: 0};

export const LastMessageCard: React.FC = () => {
    const {t} = useTranslation();

    const [message, setMessage] = useState<MessageType>(initMessage);

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
        <AmbreCard title={`${constants.emojiFile} ${t('lastMessage')}`} name={constants.cards.lastMessagesCard}>
            {(message.topic !== '') && (
                <Grid container>
                    <Grid item xs={12} sx={styles.lastMessageContainer}>
                        <span style={styles.messageDateTime}>{message.timestamp}</span>
                        {/*<span style={styles.messageDateTime}><Moment>{message.timestamp}</Moment></span>*/}
                        <div>
                            {isParsable ? (
                                <JsonView value={displayedMessage} style={{...githubLightTheme, ...styles.jsonView}}/>
                            ) : (
                                displayedMessage
                            )}
                        </div>
                    </Grid>
                </Grid>
            )}
        </AmbreCard>
    );
};
