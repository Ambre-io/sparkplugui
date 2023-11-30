import React from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

import {AmbreExpandCardButton} from "./AmbreExpandCardButton";
import {styles} from "../../styles/styles";


export const AmbreCard = (props: {title: string, children?: any}) => {

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    return (
        <Grid container id={props.title} sx={styles.ambreCard}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <AmbreExpandCardButton
                            expand={expanded}
                            onClick={goExpand}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </AmbreExpandCardButton>
                    </Grid>
                    <Grid item>
                        <p style={styles.title}>{props.title}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={expanded} timeout="auto">
                    <Grid container sx={styles.noOverflowContainer}>
                        <Grid item xs={12}>
                            {props.children}
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
};
