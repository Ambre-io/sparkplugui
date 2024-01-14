import Grid from "@mui/material/Grid";

import {AmbreCardType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";


export const AmbreCard = (props: AmbreCardType) => {

    const {title, name, children} = props;

    return (
        <Grid container id={title} sx={{height: '100%', p: 1}}>
            <Grid item xs={12} sx={styles.ambreCardTitle}>
                {title}
            </Grid>
            <Grid item xs={12} sx={styles.ambreCardContentContainer}>
                <Grid container sx={styles.ambreCardContent}>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
