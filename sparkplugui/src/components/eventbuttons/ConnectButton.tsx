import React from 'react';

import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton.tsx";
import {CONNECT, DISCONNECT} from "../../graphql/graphql.ts";
import {constants} from '../../utils/constants.ts';
import {getMQTTData} from "../../redux/data/mqttDataSlice.ts";
import {setReloadEvent} from "../../redux/events/reloadEventSlice.ts";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);
    const [connected, setConnected] = React.useState<boolean>(false);

    const error = () => toast.error(`${t('error')} ${constants.emojiSadge}`);

    const [connect] = useMutation(CONNECT);
    const [disconnect] = useLazyQuery(DISCONNECT, {fetchPolicy: "no-cache"});

    const goClick = async () => {
        if (!connected) {
            try {
                const res = await connect({variables: information});
                const data = res.data.connect;
                if (data !== null && data) {
                    dispatch(setReloadEvent()); // reload Messages subscription
                    toast.success(`${t('successConnect')} ${constants.emojiOkg}`);
                    setConnected(true);
                } else {
                    error();
                }
                if (res.errors !== undefined) {
                    console.debug('ConnectButton: connect error', res.errors);
                    error();
                }
            } catch (e) {
                console.debug('ConnectButton: connect fail', e);
                error();
            }
        } else {
            try {
                const res = await disconnect();
                const disconnected = res.data.disconnect;
                if (disconnected !== null) {
                    if (disconnected) {
                        toast.success(`${t('successDisconnect')} ${constants.emojiOkg}`);
                        setConnected(false);
                    } else {
                        error();
                    }
                }
                if (res.error !== undefined) {
                    console.debug('ConnectButton: disconnect error', res.error);
                    error();
                }
            } catch (e) {
                console.debug('ConnectButton: disconnect fail', e);
                error();
            }
        }
    };

    return connected ? (
        <AmbreIconButton onClick={goClick} icon={<CloudOffOutlinedIcon/>} tooltipTitle={t('disconnect')}/>
    ) : (
        <AmbreIconButton onClick={goClick} icon={<CloudOutlinedIcon/>} tooltipTitle={t('connect')}/>
    );
};
