import React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

import {styles} from "../../styles/styles";


export const LastMessage: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Grid container sx={styles.lastMessageContainer} justifyContent='center'>
            <Grid item xs={11} sx={styles.tree}>
                <Grid container justifyContent='center'>
                    <Grid item xs={12}>
                        <span>{t('lastMessage')}</span>
                    </Grid>
                    <Grid item xs={12}>
                        TODO
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
