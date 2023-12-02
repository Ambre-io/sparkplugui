import React from 'react';

import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {getMQTTData} from "../../redux/data/mqttDataSlice";
import {POST_MQTTDATA} from "../../graphql/graphql";
import {setReloadEvent} from "../../redux/events/reloadEventSlice";


export const DisconnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    // const success = () => toast(t('success'));
    // const error = () => toast(t('error'));

    // const [postDisconnect] = useMutation(POST_DISCONNECT);
    const goClick = () => {
        // postDisconnect({
        //     variables: information
        // }).then((res) => {
        //     const data = res.data.postDisconnect;
        //     if (data !== null && data) {
        //         dispatch(setReloadEvent()); // reload Messages subscription
        //         success();
        //     } else {
        //         error();
        //     }
        // }).catch((e) => {
        //     console.error('DisconnectButton: mutation fail', e);
        // });
    };

    return <AmbreIconButton icon={<CloudOffOutlinedIcon/>} onClick={goClick} tooltipTitle={t('disconnect')}/>;
};
