import React from 'react';

import ExpandOutlinedIcon from "@mui/icons-material/ExpandOutlined";
import {useTranslation} from "react-i18next";
import VerticalAlignCenterOutlinedIcon from "@mui/icons-material/VerticalAlignCenterOutlined";

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {initExpanded} from "../tree/Tree";
import {TreeButtonType} from "../../utils/types";


export const ExpandButton = (props: TreeButtonType) => {
    const {expanded, goClick} = props;
    const {t} = useTranslation();

    return <AmbreIconButton onClick={goClick} tooltipTitle={t('expandTooltip')} icon={
        expanded.length === initExpanded.length ? <ExpandOutlinedIcon/> : <VerticalAlignCenterOutlinedIcon/>
    }/>;
};
