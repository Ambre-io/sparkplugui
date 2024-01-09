import React from 'react';
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {constants} from '../../utils/constants.ts';
import {getMQTTData} from "../../redux/data/mqttDataSlice.ts";
import {setReloadEvent} from "../../redux/events/reloadEventSlice.ts";
import {Connect, Disconnect} from "../../../wailsjs/go/backend/App";
import {backend} from "../../../wailsjs/go/models";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);
    const [connected, setConnected] = React.useState<boolean>(false);

    const error = () => toast.error(`${t('error')} ${constants.emojiSadge}`);

    const goClick = async () => {
        if (!connected) {
            let mqttData = new backend.MQTTClientData();
            mqttData.host = information.host;
            mqttData.port = information.port;
            mqttData.username = information.username;
            mqttData.password = information.password;
            mqttData.topic = information.topic;
            Connect(mqttData).then((connected: boolean) => {
                if (connected) {
                    dispatch(setReloadEvent()); // reload Messages subscription
                    toast.success(`${t('successConnect')} ${constants.emojiOkg}`);
                    setConnected(true);
                } else {
                    error();
                }
            }).catch(e => {
                console.debug('Error: fail to connect:', e);
                error();
            });
        } else {
            Disconnect().then((disconnected) => {
                if (disconnected) {
                    toast.success(`${t('successDisconnect')} ${constants.emojiOkg}`);
                    setConnected(false);
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
