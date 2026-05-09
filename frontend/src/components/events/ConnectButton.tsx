/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React, {useRef} from 'react';
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {constants} from '../../utils/constants.ts';
import {getMQTTSetup, setMQTTSetup} from "../../redux/data/mqttSetupSlice.ts";
import {initMQTTFilenamesSlice, setMQTTFilenames} from "../../redux/data/mqttFilenamesSlice.ts";
import {clearMessages} from "../../redux/data/messagesSlice.ts";
import {clearLastMessages} from "../../redux/data/lastMessagesSlice.ts";
import {getConnected, setConnected} from "../../redux/events/connectedSlice.ts";
import {incrementTreeReset} from "../../redux/events/treeResetSlice.ts";

import {CmdConnect, CmdDisconnect} from "../../../wailsjs/go/core/App";
import {core} from "../../../wailsjs/go/models.ts";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTSetup);
    const connected = useSelector(getConnected);
    const lastTopicRef = useRef<string>('');

    const showError = (errorCode: string) => {
        // Use the translated error key if it exists, otherwise fall back to generic "error"
        const message = t(errorCode, {defaultValue: ''}) || t('error');
        toast.error(`${message}`);
    };

    const goClick = async () => {
        if (!connected) {
            CmdConnect(information).then((result: core.ConnectResult) => {
                if (result.ok) {
                    toast.success(`${t('successConnect')}`);
                    dispatch(setConnected(true));
                    dispatch(clearMessages());
                    if (information.topic !== lastTopicRef.current) {
                        dispatch(clearLastMessages());
                        dispatch(incrementTreeReset());
                        lastTopicRef.current = information.topic;
                    }
                    dispatch(setMQTTFilenames(initMQTTFilenamesSlice));
                    dispatch(setMQTTSetup({...information, cacrt: '', clientcrt: '', clientkey: ''}));
                } else {
                    showError(result.errorCode);
                }
            }).catch(e => {
                console.debug('Error: fail to connect:', e);
                showError(constants.errNetwork);
            });
        } else {
            CmdDisconnect().then((ok) => {
                if (ok) {
                    toast.success(`${t('successDisconnect')}`);
                    dispatch(setConnected(false));
                    dispatch(clearMessages());
                } else {
                    showError(constants.errNetwork);
                }
            }).catch(e => {
                console.debug('Error: fail to disconnect', e);
                showError(constants.errNetwork);
            });
        }
    };

    return connected ? (
        <AmbreIconButton onClick={goClick} icon={<CloudOffOutlinedIcon/>} tooltipTitle={t('disconnect')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<CloudOutlinedIcon/>} tooltipTitle={t('connect')}/>
    );
};
