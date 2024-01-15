import React from "react";

import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {constants} from "../../utils/constants.ts";
import {Tree} from "../tree/Tree.tsx";


export const TreeCard: React.FC = () => {
    const {t} = useTranslation();

    return (
        <AmbreCard title={`${constants.emojiTree} ${t('tree')}`}>
            <Tree/>
        </AmbreCard>
    );
};
