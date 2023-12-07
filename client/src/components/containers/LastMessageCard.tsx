import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {constants} from "../../utils/constants";
import {getLastMessages} from "../../redux/data/lastMessagesSlice";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice";
import {MessageType} from "../../utils/types";
import {styles} from "../../styles/styles";
import Moment from "react-moment";


const initMessage = {topic: '', message: '', timestamp: 0}

export const LastMessageCard: React.FC = () => {

    const {t} = useTranslation();

    const [message, setMessage] = useState<MessageType>(initMessage);

    const selectedTopic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);

    useEffect(() => {
        setMessage(messages[selectedTopic] !== undefined ? messages[selectedTopic] : initMessage);
    }, [selectedTopic, messages]);

    let displayedMessage: string;
    try {
        displayedMessage = JSON.stringify(JSON.parse(message.message), null, 4);
    } catch (_) {
        displayedMessage = message.message;
    }

    return (
        <AmbreCard title={`${constants.emojiFile} ${t('lastMessage')}`} name={constants.cards.lastMessagesCard}>
            {(message.topic !== '') && (
                <Grid container>
                    <Grid item xs={12} sx={styles.lastMessageContainer}>
                        <span style={styles.messageDateTime}><Moment>{message.timestamp}</Moment></span>
                        <pre>{displayedMessage}</pre>
                    </Grid>
                </Grid>
            )}
        </AmbreCard>
    );
};
