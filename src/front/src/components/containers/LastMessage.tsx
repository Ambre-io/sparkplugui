import React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {styles} from "../../styles/styles";
import {useSelector} from "react-redux";
import {getLastMessage} from "../../redux/data/lastMessageSlice";


export const LastMessage: React.FC = () => {

    const {t} = useTranslation();

    const message = useSelector(getLastMessage);

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12}>
                <span style={styles.subtitle}>{t('lastMessage')}</span>
            </Grid>
            <Grid item xs={12} sx={message !== null ? styles.lastMessageContainer : undefined}>
                {message}
            </Grid>
        </Grid>
    );
}
