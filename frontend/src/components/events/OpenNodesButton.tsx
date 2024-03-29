/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React from 'react';

import ExpandOutlinedIcon from "@mui/icons-material/ExpandOutlined";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import VerticalAlignCenterOutlinedIcon from "@mui/icons-material/VerticalAlignCenterOutlined";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {getParentNodes} from "../../redux/data/parentNodesSlice.ts";
import {getOpenedNodes, initOpenedNodes, setOpenedNodes} from "../../redux/data/openedNodesSlice.ts";


export const OpenNodesButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const parents = useSelector(getParentNodes);
    const openedNodes = useSelector(getOpenedNodes);
    const closed = openedNodes.length === initOpenedNodes.length;

    const goClick = () => dispatch(setOpenedNodes(closed ? parents : initOpenedNodes));

    return closed ? (
        <AmbreIconButton onClick={goClick} icon={<ExpandOutlinedIcon/>} tooltipTitle={t('open')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<VerticalAlignCenterOutlinedIcon/>} tooltipTitle={t('close')}/>
    );
};
