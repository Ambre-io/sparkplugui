import React from "react";

import ExpandOutlinedIcon from '@mui/icons-material/ExpandOutlined';
import VerticalAlignCenterOutlinedIcon from '@mui/icons-material/VerticalAlignCenterOutlined';

import {TreeButtonType} from "../../utils/types";
import {AmbreIconButton} from "../ambre/AmbreIconButton";


export const ExpandButton = (props: TreeButtonType) => {
    const {expanded, goClick} = props;  // TODO redux it

    if (expanded.length === 1) {
        return <AmbreIconButton onClick={goClick} icon={<ExpandOutlinedIcon/>}/>;
    } else {
        return <AmbreIconButton onClick={goClick} icon={<VerticalAlignCenterOutlinedIcon/>}/>;
    }
}
