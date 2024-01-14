/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

import {Provider} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "@mui/system";
import {ToastContainer, toast} from 'react-toastify';

import {Amain} from "./components/containers/Amain.tsx";
import {store} from "./redux/store";
import {theme} from './styles/muiTheme';
import './i18n/i18next';
import './styles/index.css';
import './utils/TSOverload';


export const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
            {/*see: https://alvarotrigo.com/blog/animated-backgrounds-css/#3)-floating-squares*/}
            <div className="area">
                <ul className="circles">
                    <Amain/>
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
                </ul>
            </div>
        </ThemeProvider>
    </Provider>
);
