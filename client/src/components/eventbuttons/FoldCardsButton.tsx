import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import UnfoldLessOutlinedIcon from '@mui/icons-material/UnfoldLessOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {getCard, setCard} from "../../redux/data/CardSlice";


export const FoldCardsButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const allCards = useSelector(getCard);
    const opened = Object.keys(allCards).length === 0 ? true : !Object.values(allCards).in(false);

    const goClick = () => {
        let newState = {...allCards};
        Object.keys(newState).map(k => newState[k] = !opened);
        dispatch(setCard(newState));
    };

    return opened ? (
        <AmbreIconButton onClick={goClick} icon={<UnfoldLessOutlinedIcon/>} tooltipTitle={t('fold')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<UnfoldMoreOutlinedIcon/>} tooltipTitle={t('unfold')}/>
    );
};
