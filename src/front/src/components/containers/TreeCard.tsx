import React from "react";

import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {Tree} from "../tree/Tree";
import {MessagesType} from "../../utils/types";
import {useSelector} from "react-redux";
import {getMessages} from "../../redux/data/messagesSlice";


export const TreeCard: React.FC = () => {
    const {t} = useTranslation();

    const messages: MessagesType = useSelector(getMessages);

    return (
        <AmbreCard title={`🌳 ${t('tree')}`}>
            {(messages.length > 0) && (<Tree messages={messages}/>)}
        </AmbreCard>
    );
};
