import React from "react";

import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard";


export const SettingCard: React.FC = () => {
    const {t} = useTranslation();

    return (
        <AmbreCard title={`⚙️ ${t('setting')}`}>

        </AmbreCard>
    );
};
