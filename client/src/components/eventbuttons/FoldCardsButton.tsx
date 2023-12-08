import React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import UnfoldLessOutlinedIcon from '@mui/icons-material/UnfoldLessOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {CardType} from "../../utils/types";
import {getCard, setCard} from "../../redux/data/CardSlice";


export const FoldCardsButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const allCards: CardType = useSelector(getCard);
    const opened: boolean = Object.values(allCards).in(true);

    const goClick = () => {
        let newState = {...allCards};
        Object.keys(newState).map((k: string) => newState[k] = !opened);
        dispatch(setCard(newState));
    };

    return opened ? (
        <AmbreIconButton onClick={goClick} icon={<UnfoldLessOutlinedIcon/>} tooltipTitle={t('fold')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<UnfoldMoreOutlinedIcon/>} tooltipTitle={t('unfold')}/>
    );
};
