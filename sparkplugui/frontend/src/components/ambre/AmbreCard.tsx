import Grid from "@mui/material/Grid";

import {AmbreCardType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";


export const AmbreCard = (props: AmbreCardType) => {

    const {title, name, children} = props;

    return (
        <Grid container id={title} sx={styles.ambreCard}>
            <Grid item xs={12} sx={styles.ambreCardTitle}>
                {title}
            </Grid>
            <Grid item xs={12} sx={styles.ambreCardContent}>
                <Grid container>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
