import React from 'react';
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {invoke} from '@tauri-apps/api/tauri';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {constants} from '../../utils/constants.ts';
import {getMQTTData} from "../../redux/data/mqttDataSlice.ts";
import {setReloadEvent} from "../../redux/events/reloadEventSlice.ts";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);
    const [connected, setConnected] = React.useState<boolean>(false);

    const error = () => toast.error(`${t('error')} ${constants.emojiSadge}`);

    const goClick = async () => {
        if (!connected) {
            invoke('connect'
            ).then((response) => {
                dispatch(setReloadEvent()); // reload Messages subscription
                toast.success(`${t('successConnect')} ${constants.emojiOkg}`);
                setConnected(true);
            }).catch(e => {
                console.debug('ConnectButton: connect fail', e);
                error();
            });
        } else {
            invoke('disconnect'
            ).then((response) => {
                toast.success(`${t('successDisconnect')} ${constants.emojiOkg}`);
                setConnected(false);
            }).catch(e => {
                console.debug('ConnectButton: disconnect fail', e);
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
