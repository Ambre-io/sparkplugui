import React, {useEffect} from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {styles} from "../../styles/styles";
import {useSelector} from "react-redux";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice";
import {getLastMessages} from "../../redux/data/lastMessagesSlice";


export const LastMessage: React.FC = () => {

    const {t} = useTranslation();

    const topic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);
    let message: string = messages[topic] ?? '';

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12}>
                <span style={styles.subtitle}>{t('lastMessage')}</span>
            </Grid>
            <Grid item xs={12} sx={message !== '' ? styles.lastMessageContainer : undefined}>
                {message}
            </Grid>
        </Grid>
    );
}
