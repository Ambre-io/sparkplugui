import {ApolloProvider} from '@apollo/client';
import Grid from "@mui/material/Grid";
import {Provider} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "@mui/system";
import {ToastContainer, toast} from 'react-toastify';

import {FormCard} from "./components/containers/FormCard";
import {HTTPClient} from './graphql/client';
import {LastMessageCard} from "./components/containers/LastMessageCard";
import {MessagesCard} from "./components/containers/MessagesCard";
import {SoftCard} from "./components/containers/SoftCard";
import {store} from "./redux/store";
import {styles} from "./styles/styles";
import {theme} from './styles/muiTheme';
import {TreeCard} from "./components/containers/TreeCard";
import './utils/TSOverload';
import './i18n/i18next';
import './styles/index.css';


export const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ApolloProvider client={HTTPClient}>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
                coucou
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
