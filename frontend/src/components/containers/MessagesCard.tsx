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
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {AppDispatch} from "../../redux/store.ts";
import {constants} from '../../utils/constants.ts';
import {getConnected} from "../../redux/events/connectedSlice.ts";
import {getMessages, setMessages} from "../../redux/data/messagesSlice.ts";
import {MessagesType} from "../../utils/types.ts";
import {styles} from "../../styles/styles.ts";
import {theme} from "../../styles/muiTheme.ts";
import {utils} from "../../utils/utils.ts";

import {core} from "../../../wailsjs/go/models.ts";
import {EvtPayload} from "../../../wailsjs/go/core/App";


const RATE_OPTIONS = [
    {label: '1ms', ms: 1},
    {label: '50ms', ms: 50},
    {label: '100ms', ms: 100},
    {label: '500ms', ms: 500},
    {label: '1s', ms: 1000},
    {label: '5s', ms: 5000},
    {label: '10s', ms: 10000},
];

const MessagesCardComponent: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const {t} = useTranslation();

    const connected = useSelector(getConnected);
    const connectedRef = useRef(connected);
    useEffect(() => { connectedRef.current = connected; }, [connected]);

    const [rateMs, setRateMs] = useState(1);
    const rateMsRef = useRef(rateMs);
    useEffect(() => { rateMsRef.current = rateMs; }, [rateMs]);

    const messages: MessagesType = useSelector(getMessages);

    useEffect(() => {
        let active = true;
        const poll = () => {
            if (!active) return;
            EvtPayload()
                .then((message: core.MQTTMessage | null) => {
                    if (message?.topic) dispatch(setMessages(message));
                })
                .catch(e => console.debug('Error: fail to get MQTT Payload:', e))
                .finally(() => { if (active) setTimeout(poll, connectedRef.current ? rateMsRef.current : 500); });
        };
        poll();
        return () => { active = false; };
    }, [dispatch]);

    const rateSelector = (
        <Select
            value={rateMs}
            onChange={e => setRateMs(Number(e.target.value))}
            size="small"
            variant="standard"
            disableUnderline
            sx={{fontSize: '0.75rem', color: 'secondary', ml: 1}}
        >
            {RATE_OPTIONS.map(o => (
                <MenuItem key={o.ms} value={o.ms} sx={{fontSize: '0.75rem'}}>{o.label}</MenuItem>
            ))}
        </Select>
    );

    return (
        <AmbreCard title={`${constants.emojiEnvelop} ${t('mqttMessagesTitle')}`} stickToBottom action={rateSelector}>
            <Grid container>
                {messages.slice(-200).map(({topic, payload, timestamp}, i) => (
                    <Grid key={`to${i}to`} xs={12} sx={styles.mqttMessages}>
                        <span style={styles.messageDateTime}>{utils.locale(timestamp)}</span>
                        <div style={styles.mqttTopic}>{topic}</div>
                        <div style={styles.color(theme.palette.primary.dark)}>{payload}</div>
                    </Grid>
                ))}
            </Grid>
        </AmbreCard>
    );
};

export const MessagesCard = React.memo(MessagesCardComponent);
