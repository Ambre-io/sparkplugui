import React from "react";

import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";


export const Setting: React.FC = () => {
    const {t} = useTranslation();

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const title = t('setting');

    return (
        <AmbreCard title={title}>
            Expand
        </AmbreCard>
    );
};
