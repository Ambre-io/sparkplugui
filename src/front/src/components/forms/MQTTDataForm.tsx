import React, {ChangeEvent, useMemo} from "react";

import {useMutation} from '@apollo/client';
import {FormControl, FormGroup, FormHelperText, Grid} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {constants} from "../../utils/constants";
import {AmbreButton} from "../ambre/AmbreButton";
import {AmbreTextField} from "../ambre/AmbreTextField";
import {POST_MQTTDATA} from "../../graphql/graphql";
import {getMQTTData, setMQTTData} from "../../redux/data/mqttDataSlice";
import {styles} from "../../styles/styles";


export const MQTTDataForm: React.FC = () => {

    const dispatch = useDispatch();
    const information = useSelector(getMQTTData);
    const {t} = useTranslation();

    const goChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        // let value: string | number = event.target.value
        // if (prop === constants.) value = event.target.valueAsNumber;
        dispatch(setMQTTData({...information, [prop]: event.target.value}));
    }

    const [postMQTTData] = useMutation(POST_MQTTDATA);
    const goMutation = () => {
        postMQTTData({
            variables: {...information}
        }).then((res) => {
            const data = res.data.postMQTTData;
            // if (data !== null)
        }).catch((e) => {
            console.error('MQTTDataForm: mutation fail', e);
        });
    }

    return (
        <div>
            <FormControl sx={styles.formControl} fullWidth>
                <span style={styles.subtitle}>{t('mqttInfo')}</span>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreTextField
                    label={t('host')}
                    value={information.host}
                    onChange={goChange(constants.host)}
                />
                <FormHelperText>{t('hostHelper')}</FormHelperText>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreTextField
                    label={t('port')}
                    value={information.port}
                    onChange={goChange(constants.port)}
                />
                <FormHelperText>{t('portHelper')}</FormHelperText>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreTextField
                    label={t('username')}
                    value={information.username}
                    onChange={goChange(constants.username)}
                />
                <FormHelperText>{t('usernameHelper')}</FormHelperText>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreTextField
                    label={t('password')}
                    value={information.password}
                    onChange={goChange(constants.password)}
                />
                <FormHelperText>{t('passwordHelper')}</FormHelperText>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreTextField
                    label={t('topic')}
                    value={information.topic}
                    onChange={goChange(constants.topic)}
                />
                <FormHelperText>{t('topicHelper')}</FormHelperText>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreButton
                    variant="contained"
                    onClick={goMutation}
                    endIcon={<SaveOutlinedIcon/>}
                >
                    {t('connect')}
                </AmbreButton>
            </FormControl>
        </div>
    )
}
