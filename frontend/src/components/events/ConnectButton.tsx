/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import React, {useEffect, useRef, useState} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
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
import {EventsOn} from "../../../wailsjs/runtime/runtime";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTSetup);
    const connected = useSelector(getConnected);
    const lastTopicRef = useRef<string>('');
    const [connecting, setConnecting] = useState(false);

    const showError = (errorCode: string) => {
        const message = t(errorCode, {defaultValue: ''}) || t('error');
        toast.error(`${message}`);
    };

    // Listen for broker-initiated disconnections (e.g. keepalive timeout, server restart).
    // The backend emits "connectionLost" with the classified error code when paho fires its
    // connection-lost callback, so we can flip the UI state without the user having to
    // manually press Disconnect.
    useEffect(() => {
        const unsubscribe = EventsOn('connectionLost', (errorCode: string) => {
            dispatch(setConnected(false));
            showError(errorCode || constants.errNetwork);
        });
        return unsubscribe;
    }, []);

    const goClick = async () => {
        if (!connected) {
            setConnecting(true);
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
            }).finally(() => {
                setConnecting(false);
            });
        } else {
            CmdDisconnect().then((ok) => {
                if (ok) {
                    toast.success(`${t('successDisconnect')}`);
                    dispatch(setConnected(false));
                    // messages and tree kept intentionally for inspection after disconnect
                } else {
                    showError(constants.errNetwork);
                }
            }).catch(e => {
                console.debug('Error: fail to disconnect', e);
                showError(constants.errNetwork);
            });
        }
    };

    const icon = connecting
        ? <CircularProgress size={20} color="inherit"/>
        : connected ? <CloudOffOutlinedIcon/> : <CloudOutlinedIcon/>;

    return (
        <AmbreIconButton
            onClick={goClick}
            icon={icon}
            tooltipTitle={t(connecting ? 'connecting' : connected ? 'disconnect' : 'connect')}
            disabled={connecting}
        />
    );
};
