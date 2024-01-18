import React from 'react';
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {constants} from '../../utils/constants.ts';
import {getMQTTData} from "../../redux/data/mqttDataSlice.ts";

import {core} from "../../../wailsjs/go/models";
import {CmdConnect, CmdDisconnect} from "../../../wailsjs/go/core/App";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);
    const [connected, setConnected] = React.useState<boolean>(false);

    const error = () => toast.error(`${t('error')} ${constants.emojiSadge}`);

    const goClick = async () => {
        if (!connected) {
            let mqttData = new core.MQTTClientData();
            mqttData.host = information.host;
            mqttData.port = information.port;
            mqttData.username = information.username;
            mqttData.password = information.password;
            mqttData.topic = information.topic;
            CmdConnect(mqttData).then((connected: boolean) => {
                if (connected) {
                    toast.success(`${t('successConnect')} ${constants.emojiSmile}`);
                    setConnected(true);
                } else {
                    error();
                }
            }).catch(e => {
                console.debug('Error: fail to connect:', e);
                error();
            });
        } else {
            CmdDisconnect().then((disconnected) => {
                if (disconnected) {
                    toast.success(`${t('successDisconnect')} ${constants.emojiWink}`);
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
