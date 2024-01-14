/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

import {Responsive, WidthProvider} from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import {useSelector} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

import {constants} from "../../utils/constants.ts";
import {FormCard} from "./FormCard";
import {getCustomizable} from "../../redux/data/customizableSlice.ts";
import {LastMessageCard} from "./LastMessageCard";
import {MessagesCard} from "./MessagesCard";
import {SoftCard} from "./SoftCard";
import {styles} from "../../styles/styles";
import {TreeCard} from "./TreeCard";


// RGL performance tips
// see: https://github.com/react-grid-layout/react-grid-layout#performance

const ResponsiveGridLayout = WidthProvider(Responsive);


export const Amain = () => {

    const layout = [
        {i: constants.softCard, x: 0, y: 0, w: 2, h: 1, static: true},
        {i: constants.formCard, x: 2, y: 0, w: 2, h: 3},
        {i: constants.messagesCard, x: 7, y: 0, w: 4, h: 5},
        {i: constants.treeCard, x: 0, y: 2, w: 3, h: 4},
        {i: constants.lastMessageCard, x: 3, y: 0, w: 3, h: 4}
    ];
    const layouts = {lg: layout, md: layout, sm: layout, xs: layout, xxs: layout};

    const customizable = useSelector(getCustomizable);

    return (
        <main className="resetCircles">
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                isDraggable={customizable}
                isResizable={customizable}
            >
                <div key={constants.softCard} style={styles.ambreCard}>
                    <SoftCard/>
                </div>
                <div key={constants.formCard} style={styles.ambreCard}>
                    <FormCard/>
                </div>
                <div key={constants.treeCard} style={styles.ambreCard}>
                    <TreeCard/>
                </div>
                <div key={constants.lastMessageCard} style={styles.ambreCard}>
                    <LastMessageCard/>
                </div>
                <div key={constants.messagesCard} style={styles.ambreCard}>
                    <MessagesCard/>
                </div>
            </ResponsiveGridLayout>
        </main>
    );
};
