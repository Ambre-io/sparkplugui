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


// import {Greet} from "../wailsjs/go/main/App";
//
// function App() {
//     const [resultText, setResultText] = useState("Please enter your name below 👇");
//     const [name, setName] = useState('');
//     const updateName = (e: any) => setName(e.target.value);
//     const updateResultText = (result: string) => setResultText(result);
//
//     function greet() {
//         Greet(name).then(updateResultText);
//     }
//
//     return (
//         <div id="App">
//             <img src={logo} id="logo" alt="logo"/>
//             <div id="result" className="result">{resultText}</div>
//             <div id="input" className="input-box">
//                 <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
//                 <button className="btn" onClick={greet}>Greet</button>
//             </div>
//         </div>
//     )
// }



export const App = () => (
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
