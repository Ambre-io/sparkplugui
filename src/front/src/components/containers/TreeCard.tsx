import React from "react";

import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {styles} from "../../styles/styles";
import {Tree} from "../tree/Tree";
import {MessagesType} from "../../utils/types";
import {useSelector} from "react-redux";
import {getMessages} from "../../redux/data/messagesSlice";


export const TreeCard: React.FC = () => {
    const {t} = useTranslation();

    const messages: MessagesType = useSelector(getMessages);

    return (
        <AmbreCard title={`🌳 ${t('tree')}`}>
            {(messages.length > 0) && (
                <Grid container sx={styles.noOverflowContainer}>
                    <Grid item xs={12}>
                        <Tree messages={messages}/>
                    </Grid>
                </Grid>
            )}
        </AmbreCard>
    );
};
