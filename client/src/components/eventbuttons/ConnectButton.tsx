import React from 'react';

import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";

import {AmbreIconButton} from "../ambre/AmbreIconButton";
import {useMutation} from "@apollo/client";
import {POST_MQTTDATA} from "../../graphql/graphql";
import {setReloadEvent} from "../../redux/events/reloadEventSlice";
import {useDispatch, useSelector} from "react-redux";
import {getMQTTData} from "../../redux/data/mqttDataSlice";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";


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
                dispatch(setReloadEvent()); // reload MQTT messages subscription
                success();
            } else {
                error();
            }
        }).catch((e) => {
            console.error('FormCard: mutation fail', e);
        });
    };

    return <AmbreIconButton onClick={goClick} icon={<CloudOutlinedIcon/>}/>;
};
