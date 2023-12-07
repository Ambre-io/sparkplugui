import React from "react";

import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";
import {constants} from "../../utils/constants";
import {Tree} from "../tree/Tree";


export const TreeCard: React.FC = () => {
    const {t} = useTranslation();

    return (
        <AmbreCard title={`${constants.emojiTree} ${t('tree')}`} name={constants.cards.treeCard}>
            <Tree/>
        </AmbreCard>
    );
};
