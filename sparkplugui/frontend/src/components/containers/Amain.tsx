/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React from "react";
import {Layout, Layouts, Responsive, WidthProvider} from "react-grid-layout";
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
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

let mdLayout = [
    {i: constants.softCard, x: 0, y: 0, w: 3, h: 1, static: true},
    {i: constants.formCard, x: 3, y: 0, w: 3, h: 5, minW: 3, minH: 1},
    {i: constants.treeCard, x: 0, y: 2, w: 3, h: 2, minW: 3, minH: 1},
    {i: constants.lastMessageCard, x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 1},
    {i: constants.messagesCard, x: 6, y: 0, w: 4, h: 5, minW: 3, minH: 1}
];
let lgLayout = [
    {i: constants.softCard, x: 0, y: 0, w: 3, h: 1, static: true},
    {i: constants.formCard, x: 3, y: 0, w: 5, h: 1, minW: 3, minH: 1},
    {i: constants.treeCard, x: 0, y: 2, w: 4, h: 5, minW: 3, minH: 1},
    {i: constants.lastMessageCard, x: 4, y: 0, w: 4, h: 5, minW: 3, minH: 1},
    {i: constants.messagesCard, x: 8, y: 0, w: 4, h: 6, minW: 3, minH: 1}
];
let xlLayout = [
    {i: constants.softCard, x: 0, y: 0, w: 2, h: 1, static: true},
    {i: constants.formCard, x: 2, y: 0, w: 5, h: 2, minW: 2, minH: 1},
    {i: constants.treeCard, x: 0, y: 2, w: 3, h: 5, minW: 2, minH: 1},
    {i: constants.lastMessageCard, x: 3, y: 0, w: 4, h: 5, minW: 2, minH: 1},
    {i: constants.messagesCard, x: 7, y: 0, w: 5, h: 7, minW: 2, minH: 1}
];

const mdSaved: string | null = localStorage.getItem(constants.md);
if (mdSaved !== null) mdLayout = JSON.parse(mdSaved);
const lgSaved: string | null = localStorage.getItem(constants.lg);
if (lgSaved !== null) lgLayout = JSON.parse(lgSaved);
const xlSaved: string | null = localStorage.getItem(constants.xl);
if (xlSaved !== null) xlLayout = JSON.parse(xlSaved);

const initLayouts: Layouts = {xl: xlLayout, lg: lgLayout, md: mdLayout};


export const Amain: React.FC = () => {

    const customizable: boolean = useSelector(getCustomizable);

    const ResponsiveGridLayout = React.useMemo(() => WidthProvider(Responsive), []);

    const [layouts, setLayouts] = React.useState<Layouts>(initLayouts);
    const [breakpoint, setBreakpoint] = React.useState<string>(constants.md);

    const goLayoutChange = (layout: Layout[], allLayouts: Layouts) : void => {
        localStorage.setItem(breakpoint, JSON.stringify(layout));
        setLayouts(allLayouts);
    };

    const goBreakpointChange = (newBreakpoint: string) => setBreakpoint(newBreakpoint);

    const memoSoftCard = React.useMemo(() => <SoftCard/>, []);
    const memoFormCard = React.useMemo(() => <FormCard/>, []);
    const memoTreeCard = React.useMemo(() => <TreeCard/>, []);
    const memoLastMessageCard = React.useMemo(() => <LastMessageCard/>, []);
    const memoMessagesCard = React.useMemo(() => <MessagesCard/>, []);

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            onLayoutChange={goLayoutChange}
            onBreakpointChange={goBreakpointChange}
            breakpoints={{xl: constants.xlSize, lg: constants.lgSize, md: constants.mdSize}}
            cols={{xl: 12, lg: 12, md: 10}}
            isDraggable={customizable}
            isResizable={customizable}
        >
            <div key={constants.softCard} style={styles.RGLContainer}>
                {memoSoftCard}
            </div>
            <div key={constants.formCard} style={styles.RGLContainer}>
                {memoFormCard}
            </div>
            <div key={constants.treeCard} style={styles.RGLContainer}>
                {memoTreeCard}
            </div>
            <div key={constants.lastMessageCard} style={styles.RGLContainer}>
                {memoLastMessageCard}
            </div>
            <div key={constants.messagesCard} style={styles.RGLContainer}>
                {memoMessagesCard}
            </div>
        </ResponsiveGridLayout>
    );
};
