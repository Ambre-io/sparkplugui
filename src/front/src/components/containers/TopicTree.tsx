import React from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";


import {AmbreExpandButton} from "../ambre/AmbreExpandButton";

import {getMessages} from "../../redux/data/messagesSlice";
import {MessagesType, MessageType, NodeType} from "../../utils/types";
import {styles} from "../../styles/styles";
import {Tree} from "../tree/Tree";
import { constants } from "../../utils/constants";


export const TopicTree: React.FC = () => {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const {t} = useTranslation();

    const messages: MessagesType = useSelector(getMessages);

    // TODO
    //  - parse messages
    //  - create a new sub node on each '/' in the topic
    //  - if node exists go inside
    //  - the metric name is the leaf
    //      - ignition style parse over | but idk if its a good idea
    //      - maybe the good way to do this is to have a single leaf and on click, display last reived decoded metrics

    const topicTreeRoot: NodeType = {
        id: constants.rootID,
        label: 'first label',
        subnodes: []
    }

    messages.map((message: MessageType) => {
        message.topic
    });

    return (
        <Grid container id='MQTTMessages' sx={styles.ambreCard}>
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
                        <p style={styles.subtitle}>{t('topicTreeTitle')}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container sx={{...styles.marginTop2}}>
                        <Grid item xs={6} sx={styles.ambreCardParts}>
                            <Tree data={topicTreeRoot}/>
                        </Grid>
                        <Grid item xs={6} sx={styles.ambreCardParts}>
                            values
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
}
