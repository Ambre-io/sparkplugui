import React from "react";

import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {constants} from "../../utils/constants";
import {getMessages} from "../../redux/data/messagesSlice";
import {MessagesType} from "../../utils/types";
import {Tree} from "../tree/Tree";
import {useSelector} from "react-redux";


export const TreeCard: React.FC = () => {
    const {t} = useTranslation();

    const messages: MessagesType = useSelector(getMessages);

    return (
        <AmbreCard title={`${constants.emojiTree} ${t('tree')}`}>
            {(messages.length > 0) && (<Tree messages={messages}/>)}
        </AmbreCard>
    );
};
