import Grid from "@mui/material/Grid";

import {AmbreCardType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";


export const AmbreCard = (props: AmbreCardType) => {

    const {title, name, children} = props;

    return (
        <Grid container id={title}>
            <Grid item xs={12}>
                <p style={styles.title}>{title}</p>
            </Grid>
            <Grid item xs={12}>
                <Grid container sx={styles.noOverflowContainer}>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
