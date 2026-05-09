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
import {Layout, LayoutItem, ResponsiveGridLayout, ResponsiveLayouts, useContainerWidth} from "react-grid-layout";
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


// TODO @@@ remove static true (exept for softCard) when responsive layout is back
const defaultResponsiveLayouts: ResponsiveLayouts = {
    md: [
        {i: constants.softCard, x: 0, y: 0, w: 3, h: 1, static: true},
        {i: constants.formCard, x: 3, y: 0, w: 3, h: 5, minW: 3, minH: 1, static: true},
        {i: constants.treeCard, x: 0, y: 1, w: 3, h: 2, minW: 3, minH: 1, static: true},
        {i: constants.lastMessageCard, x: 0, y: 3, w: 3, h: 2, minW: 3, minH: 1, static: true},
        {i: constants.messagesCard, x: 6, y: 0, w: 4, h: 5, minW: 3, minH: 1, static: true}
    ],
    lg: [
        {i: constants.softCard, x: 0, y: 0, w: 3, h: 1, static: true},
        {i: constants.formCard, x: 3, y: 0, w: 5, h: 1, minW: 3, minH: 1, static: true},
        {i: constants.treeCard, x: 0, y: 1, w: 4, h: 4, minW: 3, minH: 1, static: true},
        {i: constants.lastMessageCard, x: 4, y: 1, w: 4, h: 4, minW: 3, minH: 1, static: true},
        {i: constants.messagesCard, x: 8, y: 0, w: 4, h: 5, minW: 3, minH: 1, static: true}
    ],
    xl: [
        {i: constants.softCard, x: 0, y: 0, w: 2, h: 1, static: true},
        {i: constants.formCard, x: 2, y: 0, w: 5, h: 2, minW: 2, minH: 1, static: true},
        {i: constants.treeCard, x: 0, y: 2, w: 3, h: 5, minW: 2, minH: 1, static: true},
        {i: constants.lastMessageCard, x: 3, y: 2, w: 4, h: 5, minW: 2, minH: 1, static: true},
        {i: constants.messagesCard, x: 7, y: 0, w: 5, h: 7, minW: 2, minH: 1, static: true}
    ]
};

// TODO @@@ rehabilitate the responsive layout
// const loadResponsiveLayouts = (): ResponsiveLayouts => {
//     try {
//         const savedResponsiveLayouts = localStorage.getItem(constants.sparkplugui_layouts);
//         return savedResponsiveLayouts ? JSON.parse(savedResponsiveLayouts) : defaultResponsiveLayouts;
//     } catch (e) {
//         console.log('Error: loadResponsiveLayouts', e);
//         return defaultResponsiveLayouts;
//     }
// };

// const saveResponsiveLayouts = (layouts: ResponsiveLayouts) => {
//     try {
//         localStorage.setItem(constants.sparkplugui_layouts, JSON.stringify(layouts));
//     } catch (e) {
//         console.log('Error: saveLayout', e);
//     }
// }


export const Amain: React.FC = () => {

    const customizable: boolean = useSelector(getCustomizable);

    const [layouts, setResponsiveLayouts] = React.useState<ResponsiveLayouts>(defaultResponsiveLayouts);

    // React.useEffect(() => {
    //     // Save layouts on unload
    //     window.addEventListener(constants.beforeunload, () => saveResponsiveLayouts(layouts));
    //     return () => window.removeEventListener(constants.beforeunload, () => saveResponsiveLayouts(layouts));
    // }, [layouts]);

    const goLayoutChange = (_: Layout, allResponsiveLayouts: ResponsiveLayouts): void => {
        setResponsiveLayouts(allResponsiveLayouts);
        // saveResponsiveLayouts(allResponsiveLayouts);
    };

    const {width, containerRef} = useContainerWidth({initialWidth: 1280});

    // Control drag/resize via `static` per item — grid-level config never changes,
    // so the grid never re-initializes when customizable toggles (avoids freeze).
    // const effectiveLayouts = React.useMemo((): ResponsiveLayouts => {
    //     const result: ResponsiveLayouts = {};
    //     for (const [bp, items] of Object.entries(layouts)) {
    //         result[bp] = (items as Layout).map((item: LayoutItem) =>
    //             item.i === constants.softCard
    //                 ? item
    //                 : {...item, static: !customizable}
    //         );
    //     }
    //     return result;
    // }, [layouts, customizable]);

    // RGL performance tips
    // see: https://github.com/react-grid-layout/react-grid-layout#performance
    const memoSoftCard: JSX.Element = React.useMemo(() => <SoftCard/>, []);
    const memoFormCard: JSX.Element = React.useMemo(() => <FormCard/>, []);
    const memoTreeCard: JSX.Element = React.useMemo(() => <TreeCard/>, []);
    const memoLastMessageCard: JSX.Element = React.useMemo(() => <LastMessageCard/>, []);
    const memoMessagesCard: JSX.Element = React.useMemo(() => <MessagesCard/>, []);

    return (
        <div ref={containerRef as React.RefObject<HTMLDivElement>} style={{width: '100%', height: '100%'}}>
            <ResponsiveGridLayout
                width={width}
                className="layout"
                layouts={layouts}
                onLayoutChange={goLayoutChange}
                breakpoints={{xl: constants.xl, lg: constants.lg, md: constants.md}}
                cols={{xl: 12, lg: 12, md: 10}}
                dragConfig={{enabled: true}}
                resizeConfig={{enabled: true}}
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
        </div>
    );
};
