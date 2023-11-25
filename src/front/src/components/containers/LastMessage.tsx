import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {styles} from "../../styles/styles";
import {useSelector} from "react-redux";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice";
import {getLastMessages} from "../../redux/data/lastMessagesSlice";


export const LastMessage: React.FC = () => {

    const {t} = useTranslation();

    const [message, setMessage] = useState<string>('');

    const topic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);

    useEffect(() => {
        setMessage(messages[topic] !== undefined ? messages[topic] : '');
    }, [topic, messages]);

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12}>
                <span style={styles.subtitle}>📄 {t('lastMessage')}</span>
            </Grid>
            {message !== '' && (
                <Grid item xs={12} sx={styles.lastMessageContainer}>
                    {message}
                </Grid>
            )}
        </Grid>
    );
}
