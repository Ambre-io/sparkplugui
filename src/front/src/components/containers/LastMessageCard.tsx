import React, {useEffect, useState} from 'react';

import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {getLastMessages} from "../../redux/data/lastMessagesSlice";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice";
import {styles} from "../../styles/styles";


export const LastMessageCard: React.FC = () => {

    const {t} = useTranslation();

    const [message, setMessage] = useState<string>('');

    const topic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);

    useEffect(() => {
        setMessage(messages[topic] !== undefined ? messages[topic] : '');
    }, [topic, messages]);

    return (
        <AmbreCard title={`📄 ${t('lastMessage')}`}>
            {(message !== '') && (
                <Grid container>
                    <Grid item xs={12} sx={styles.lastMessageContainer}>
                        {message}
                    </Grid>
                </Grid>
            )}
        </AmbreCard>
    );
};
