import React from "react";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2";
import {styles} from "../../styles/styles";
import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import {MessagesType, MessageType} from "../../utils/types";
import {useSelector} from "react-redux";
import {getMessages} from "../../redux/data/messagesSlice";


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

    messages.map((message: MessageType) => {
        message.topic
    });

    return (
        <Grid container id='MQTTMessages' sx={styles.ambreCard}>
            <Grid>
                <Grid container>
                    <Grid>
                        <AmbreExpandButton
                            expand={expanded}
                            onClick={goExpand}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </AmbreExpandButton>
                    </Grid>
                    <Grid>
                        <p style={styles.subtitle}>{t('topicTreeTitle')}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={styles.width100}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container sx={styles.marginTop2}>
                        lalalala
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
}
