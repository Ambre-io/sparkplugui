import React, {useEffect, useState} from 'react';

import {Collapse, Grid} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import {getLastMessages} from "../../redux/data/lastMessagesSlice";
import {getSelectedTopic} from "../../redux/data/selectedTopicSlice";
import {styles} from "../../styles/styles";


export const LastMessage: React.FC = () => {

    const {t} = useTranslation();

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const [message, setMessage] = useState<string>('');

    const topic = useSelector(getSelectedTopic);
    const messages = useSelector(getLastMessages);

    useEffect(() => {
        setMessage(messages[topic] !== undefined ? messages[topic] : '');
    }, [topic, messages]);

    return (
        <Grid container id='LastMessage' sx={styles.ambreCard}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <AmbreExpandButton
                            expand={expanded}
                            onClick={goExpand}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </AmbreExpandButton>
                    </Grid>
                    <Grid item>
                        <p style={styles.title}>📄 {t('lastMessage')}</p>
                    </Grid>
                </Grid>
            </Grid>
            {(message !== '') && (
                <Grid item xs={12}>
                    <Collapse in={expanded} timeout="auto">
                        <Grid container sx={styles.topicTreeContainer}>
                            <Grid item xs={12} sx={styles.lastMessageContainer}>
                                {message}
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            )}
        </Grid>
    );
};
