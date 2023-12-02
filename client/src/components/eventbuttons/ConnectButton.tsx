import React from 'react';

import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {getMQTTData} from "../../redux/data/mqttDataSlice";
import {CONNECT, DISCONNECT} from "../../graphql/graphql";
import {setReloadEvent} from "../../redux/events/reloadEventSlice";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);
    const [connected, setConnected] = React.useState<boolean>(false);

    const success = () => toast(t('success'));
    const error = () => toast(t('error'));

    const [connectMutation] = useMutation(CONNECT);
    const [disconnectQuery] = useLazyQuery(DISCONNECT, {fetchPolicy: "no-cache"});

    const goClick = () => {
        if (!connected) {
            connectMutation({
                variables: information
            }).then((res) => {
                const data = res.data.connect;
                if (data !== null && data) {
                    dispatch(setReloadEvent()); // reload Messages subscription
                    success();
                    setConnected(true);
                } else {
                    error();
                }
                if (res.errors !== undefined) {
                    console.debug('ConnectButton: connectMutation error', res.errors);
                    error();
                }
            }).catch((e) => {
                console.debug('ConnectButton: connectMutation fail', e);
                error();
            });
        } else {
            disconnectQuery().then((res) => {
                const disconnected = res.data.disconnect;
                if (disconnected !== null) {
                    if (disconnected) {
                        success();
                        setConnected(false);
                    } else {
                        error();
                    }
                }
                if (res.error !== undefined) {
                    console.debug('ConnectButton: disconnectQuery error', res.error);
                    error();
                }
            }).catch((e) => {
                console.debug('ConnectButton: disconnectQuery fail', e);
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
