import React from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

import {AmbreOpenCardButton} from "./AmbreOpenCardButton";
import {styles} from "../../styles/styles";


export const AmbreCard = (props: {title: string, children?: any}) => {

    const [opened, setOpened] = React.useState<boolean>(true);
    const goOpen = () => setOpened(!opened);

    return (
        <Grid container id={props.title} sx={styles.ambreCard}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <AmbreOpenCardButton
                            open={opened}
                            onClick={goOpen}
                            aria-expanded={opened}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </AmbreOpenCardButton>
                    </Grid>
                    <Grid item>
                        <p style={styles.title}>{props.title}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={opened} timeout="auto">
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
