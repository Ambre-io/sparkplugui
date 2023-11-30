import React from 'react';

import ExpandOutlinedIcon from "@mui/icons-material/ExpandOutlined";
import {useDispatch, useSelector} from "react-redux";
import VerticalAlignCenterOutlinedIcon from "@mui/icons-material/VerticalAlignCenterOutlined";

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {getParentNodes} from "../../redux/data/parentNodesSlice";
import {getExpandedNodes, initExpandedNodes, setExpandedNodes} from "../../redux/data/expandedNodesSlice";


export const ExpandNodesButton: React.FC = () => {
    const dispatch = useDispatch();

    const parents = useSelector(getParentNodes);
    const expandedNodes = useSelector(getExpandedNodes);
    const isCollapsed = expandedNodes.length === initExpandedNodes.length;

    const goClick = () => dispatch(setExpandedNodes(isCollapsed ? parents : initExpandedNodes));

    return <AmbreIconButton onClick={goClick} icon={isCollapsed ? <ExpandOutlinedIcon/> : <VerticalAlignCenterOutlinedIcon/>}/>;
};
