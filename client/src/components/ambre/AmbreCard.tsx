import React, {useEffect} from "react";

import {Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";

import {AmbreOpenCardButton} from "./AmbreOpenCardButton";
import {styles} from "../../styles/styles";
import {getCard, setCard} from "../../redux/data/CardSlice";


export const AmbreCard = (props: {title: string, children?: any}) => {
    const dispatch = useDispatch();

    const openedCards = useSelector(getCard);

    const [opened, setOpened] = React.useState<boolean>(true);
    const goOpen = () => setOpened(!opened);

    useEffect(() => {
        dispatch(setCard({[props.title]: opened}));
    }, [opened]);

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
