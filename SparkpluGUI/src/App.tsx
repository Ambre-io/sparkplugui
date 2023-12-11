import * as React from 'react';
import {createRoot} from 'react-dom/client';

import {ApolloProvider} from '@apollo/client';
import {ThemeProvider} from "@mui/system";
import {Provider} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {HTTPClient} from './graphql/client';
import {store} from "./redux/store";
import {theme} from './styles/muiTheme';
import './utils/TSOverload';
import './i18n/i18next';
import './styles/index.css';

import Grid from "@mui/material/Grid";

import {FormCard} from "./components/containers/FormCard";
import {LastMessageCard} from "./components/containers/LastMessageCard";
import {MessagesCard} from "./components/containers/MessagesCard";
import {SoftCard} from "./components/containers/SoftCard";
import {styles} from "./styles/styles";
import {TreeCard} from "./components/containers/TreeCard";


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
