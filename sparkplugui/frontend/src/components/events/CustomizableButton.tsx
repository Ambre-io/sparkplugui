import React from 'react';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {constants} from '../../utils/constants.ts';
import {getCustomizable, setCustomizable} from "../../redux/data/customizableSlice.ts";


export const CustomizableButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const customizable = useSelector(getCustomizable);

    const goClick = async () => {
        dispatch(setCustomizable(!customizable));
    };

    return customizable ? (
        <AmbreIconButton onClick={goClick} icon={<LockOpenOutlinedIcon/>} tooltipTitle={t('lock')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<LockOutlinedIcon/>} tooltipTitle={t('unlock')}/>
    );
};
