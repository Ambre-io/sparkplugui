/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React from 'react';
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

import {CmdConnect, CmdDisconnect} from "../../../wailsjs/go/core/App";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTSetup);
    const connected = useSelector(getConnected);

    const error = () => toast.error(`${t('error')} ${constants.emojiSadge}`);

    const goClick = async () => {
        if (!connected) {
            CmdConnect(information).then((ok: boolean) => {
                if (ok) {
                    toast.success(`${t('successConnect')} ${constants.emojiSmile}`);
                    dispatch(setConnected(true));
                    dispatch(clearMessages());
                    dispatch(clearLastMessages());
                    dispatch(setMQTTFilenames(initMQTTFilenamesSlice));
                    dispatch(setMQTTSetup({...information, cacrt: '', clientcrt: '', clientkey: ''}));
                } else {
                    error();
                }
            }).catch(e => {
                console.debug('Error: fail to connect:', e);
                error();
            });
        } else {
            CmdDisconnect().then((ok) => {
                if (ok) {
                    toast.success(`${t('successDisconnect')} ${constants.emojiWink}`);
                    dispatch(setConnected(false));
                    dispatch(clearMessages());
                    // tree and lastMessages kept intentionally for inspection after disconnect
                } else {
                    error();
                }
            }).catch(e => {
                console.debug('Error: fail to disconnect', e);
                error();
            });
        }
    };

    return connected ? (
        <AmbreIconButton onClick={goClick} icon={<CloudOffOutlinedIcon/>} tooltipTitle={t('disconnect')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<CloudOutlinedIcon/>} tooltipTitle={t('connect')}/>
    );
};
