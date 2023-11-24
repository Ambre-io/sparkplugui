import React from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";

import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import {styles} from "../../styles/styles";
import {Tree} from "../tree/Tree";
import {LastMessage} from "./LastMessage";


export const TopicTree: React.FC = () => {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const {t} = useTranslation();

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
                        <p style={styles.title}>{t('topicTreeTitle')}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container>
                        <Grid item xs={7}>
                            <Tree/>
                        </Grid>
                        <Grid item xs={5}>
                            <LastMessage/>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
}
