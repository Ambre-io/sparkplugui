import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getReloadEvent} from "../../redux/events/reloadEventSlice";
import {useSubscription} from "@apollo/client";
import {WS_MESSAGE_RECEIVED} from "../../graphql/graphql";
import {MessagesType} from "../../utils/types";
import {getMessages, setMessages} from "../../redux/data/messagesSlice";
import {AppDispatch} from "../../redux/store";
import Grid from "@mui/material/Unstable_Grid2";
import {styles} from "../../styles/styles";
import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import {theme} from "../../styles/muiTheme";
import {utils} from "../../utils/utils";


export const TopicTree: React.FC = () => {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const {t} = useTranslation();

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
