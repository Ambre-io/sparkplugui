/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

import GridLayout from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import {Provider} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "@mui/system";
import {ToastContainer, toast} from 'react-toastify';

import {FormCard} from "./components/containers/FormCard";
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

// RGL performance tips
// see: https://github.com/react-grid-layout/react-grid-layout#performance


export const App = () => {
    const layout = [
        {i: "a", x: 0, y: 0, w: 1, h: 2, static: true},
        {i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: "c", x: 4, y: 0, w: 1, h: 2},
        {i: "d", x: 6, y: 0, w: 1, h: 2},
        {i: "e", x: 0, y: 4, w: 1, h: 2}
    ];
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
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
                            <GridLayout
                                className="layout"
                                layout={layout}
                                cols={12}
                                rowHeight={30}
                                width={1200}
                            >
                                <div key="a"><SoftCard/></div>
                                <div key="b"><FormCard/></div>
                                <div key="c"><TreeCard/></div>
                                <div key="d"><LastMessageCard/></div>
                                <div key="e"><MessagesCard/></div>
                            </GridLayout>
                        </main>
                    </ul>
                </div>
            </ThemeProvider>
        </Provider>
    );
};
