import React from 'react';

import {Grid} from "@mui/material";

import {Forms} from "./Forms";
import {SoftCard} from "./SoftCard";


export const App: React.FC = () => {

    return (
        <main>
            <Grid container sx={{flexGrow: 1}}>
                <Grid item xs={12}>
                    <SoftCard/>
                </Grid>
                <Grid container sx={{flexGrow: 1}}>
                    <Grid item sm={12} md={6}>
                        <Forms/>
                    </Grid>
                    <Grid item sm={12} md={6}>

                    </Grid>
                </Grid>
            </Grid>
        </main>
    )
}
