import React from 'react';

import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "@apollo/client";
import {useTranslation} from "react-i18next";

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {getMQTTData} from "../../redux/data/mqttDataSlice";
import {POST_MQTTDATA} from "../../graphql/graphql";
import {setReloadEvent} from "../../redux/events/reloadEventSlice";


export const ConnectButton: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);

    const success = () => toast(t('success'));
    const error = () => toast(t('error'));

    const [postMQTTData] = useMutation(POST_MQTTDATA);
    const goClick = () => {
        postMQTTData({
            variables: information
        }).then((res) => {
            const data = res.data.postMQTTData;
            if (data !== null && data) {
                dispatch(setReloadEvent()); // reload Messages subscription
                success();
            } else {
                error();
            }
        }).catch((e) => {
            console.error('FormCard: mutation fail', e);
        });
    };

    return <AmbreIconButton icon={<CloudOutlinedIcon/>} onClick={goClick} tooltipTitle={t('connect')}/>;
};
