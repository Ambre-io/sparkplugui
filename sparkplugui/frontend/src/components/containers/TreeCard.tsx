/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
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
