import React, {useEffect} from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";

import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import {styles} from "../../styles/styles";
import {Tree} from "../tree/Tree";
import {LastMessage} from "./LastMessage";
import {MessagesType} from "../../utils/types";
import {useSelector} from "react-redux";
import {getMessages} from "../../redux/data/messagesSlice";


export const TopicTree: React.FC = () => {
    const {t} = useTranslation();

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const messages: MessagesType = useSelector(getMessages);

    return (
        <Grid container id='TopicTree' sx={styles.ambreCard}>
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
                        <p style={styles.title}>🌳 {t('tree')}</p>
                    </Grid>
                </Grid>
            </Grid>
            {(messages.length > 0) && (
                <Grid item xs={12}>
                    <Collapse in={expanded} timeout="auto">
                        <Grid container sx={styles.topicTreeContainer}>
                            <Grid item xs={12}>
                                <Tree messages={messages}/>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            )}
        </Grid>
    );
};
