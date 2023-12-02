import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {constants} from "../../utils/constants";
import {getLastMessages} from "../../redux/data/lastMessagesSlice";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice";
import {styles} from "../../styles/styles";


export const LastMessageCard: React.FC = () => {

    const {t} = useTranslation();

    const [message, setMessage] = useState<string>('');

    const selectedTopic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);

    useEffect(() => {
        setMessage(messages[selectedTopic] !== undefined ? messages[selectedTopic] : '');
    }, [selectedTopic, messages]);

    let displayedMessage: string;
    try {
        displayedMessage = JSON.stringify(JSON.parse(message), null, 4);
    } catch (_) {
        displayedMessage = message;
    }

    return (
        <AmbreCard title={`${constants.emojiFile} ${t('lastMessage')}`}>
            {(message !== '') && (
                <Grid container>
                    <Grid item xs={12} sx={styles.lastMessageContainer}>
                        <pre>{displayedMessage}</pre>
                    </Grid>
                </Grid>
            )}
        </AmbreCard>
    );
};
