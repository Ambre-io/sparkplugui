import React, {ChangeEvent, useMemo} from "react";

import {useMutation} from '@apollo/client';
import {FormControl, FormGroup, FormHelperText} from "@mui/material";
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
        <FormGroup>
            <FormControl sx={styles.formControl} fullWidth>
                <span style={styles.subtitle}>{t('blabla')}</span>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreTextField
                    label={t('tag')}
                    // value={information.tag}
                    // onChange={goChange(constants.tag)}
                />
                <FormHelperText>{t('tagHelper')}</FormHelperText>
            </FormControl>
            <FormControl sx={styles.formControl} fullWidth>
                <AmbreButton
                    variant="contained"
                    onClick={goMutation}
                    endIcon={<SaveOutlinedIcon/>}
                >
                    {t('send')}
                </AmbreButton>
            </FormControl>
        </FormGroup>
    )
}
