import React, {useEffect} from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";

import {AmbreCardType} from "../../utils/types.ts";
import {AmbreOpenCardButton} from "./AmbreOpenCardButton.tsx";
import {styles} from "../../styles/styles.ts";
import {getCard, setCard} from "../../redux/data/CardSlice.ts";


export const AmbreCard = (props: AmbreCardType) => {
    const dispatch = useDispatch();

    const {title, name, children} = props;

    const openedCards = useSelector(getCard);

    const opened = openedCards[name];
    const goOpen = () => dispatch(setCard({[name]: !opened}));

    return (
        <Grid container id={title} sx={styles.ambreCard}>
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
                        <p style={styles.title}>{title}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={opened} timeout="auto">
                    <Grid container sx={styles.noOverflowContainer}>
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Grid>
    );
};
