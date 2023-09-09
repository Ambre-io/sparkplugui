import React from 'react';

import {Grid} from "@mui/material";
import {useTranslation} from 'react-i18next';

import {Menu} from "./Menu";
import {styles} from "../../styles/styles";


export const App: React.FC = () => {

    const {t} = useTranslation();

    return (
        <main>
            <Grid container sx={{flexGrow: 1}}>
                <Grid item sm={12}>
                    <Grid container sx={{flexGrow: 1}} justifyContent='center'>
                        <Grid item sm={11}>
                            <Menu/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container sx={{flexGrow: 1}}>
                    <Grid item sm={12} md={6}>

                    </Grid>
                    <Grid item sm={12} md={6}>

                    </Grid>
                </Grid>
            </Grid>
        </main>
    )
}
