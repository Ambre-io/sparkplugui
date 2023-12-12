import * as React from 'react';
import {createRoot} from 'react-dom/client';

import {ApolloProvider} from '@apollo/client';
import Grid from "@mui/material/Grid";
import {Provider} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "@mui/system";
import {ToastContainer, toast} from 'react-toastify';

import {FormCard} from "./client/components/containers/FormCard";
import {HTTPClient} from './client/graphql/client';
import {LastMessageCard} from "./client/components/containers/LastMessageCard";
import {MessagesCard} from "./client/components/containers/MessagesCard";
import {SoftCard} from "./client/components/containers/SoftCard";
import {store} from "./client/redux/store";
import {styles} from "./client/styles/styles";
import {theme} from './client/styles/muiTheme';
import {TreeCard} from "./client/components/containers/TreeCard";
import './client/utils/TSOverload';
import './client/i18n/i18next';
import './client/styles/index.css';


const root = createRoot(document.body);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ApolloProvider client={HTTPClient}>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
                {/*see: https://alvarotrigo.com/blog/animated-backgrounds-css/#3)-floating-squares*/}
                <div className="area">
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <main className="resetCircles">
                            <Grid container>
                                <Grid item xs={7}>
                                    <Grid container>
                                        <Grid item xs={6} sx={styles.padding(2)}>
                                            <SoftCard/>
                                        </Grid>
                                        <Grid item xs={6} sx={styles.padding(2)}>
                                            <FormCard/>
                                        </Grid>
                                        <Grid item xs={6} sx={styles.padding(2)}>
                                            <TreeCard/>
                                        </Grid>
                                        <Grid item xs={6} sx={styles.padding(2)}>
                                            <LastMessageCard/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5} sx={styles.padding(2)}>
                                    <MessagesCard/>
                                </Grid>
                            </Grid>
                        </main>
                    </ul>
                </div>
            </ApolloProvider>
        </ThemeProvider>
    </Provider>
);
