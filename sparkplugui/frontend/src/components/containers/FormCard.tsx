import React, {ChangeEvent} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {FormControl, FormGroup, FormHelperText, IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {AmbreTextField} from "../ambre/AmbreTextField.tsx";
import {constants} from "../../utils/constants.ts";
import {getMQTTSetup, setMQTTSetup} from "../../redux/data/mqttSetupSlice.ts";
import {styles} from "../../styles/styles.ts";

import {core} from "../../../wailsjs/go/models.ts";


export const FormCard: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTSetup);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const goChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        // let value: string | number = event.target.value
        // if (prop === constants.) value = event.target.valueAsNumber;
        let setup: core.MQTTSetup;
        if ([constants.fqncacrt, constants.fqnclientcrt, constants.fqnclientkey].in(prop)) {
            setup = {
                ...information,
                certificates: {
                    ...information.certificates,
                    [prop]: event.target.value
                }
            } as core.MQTTSetup;
        } else {
            setup = {
                ...information,
                [prop]: event.target.value
            } as core.MQTTSetup;
        }
        dispatch(setMQTTSetup(setup));
    };

    return (
        <AmbreCard title={`${constants.emojiConnection} ${t('mqttInformation')}`}>
            <FormGroup>
                <FormControl sx={styles.formCardFirstInput} fullWidth>
                    <AmbreTextField
                        label={`${t('host')} *`}
                        value={information.host}
                        onChange={goChange(constants.host)}
                    />
                    <FormHelperText>{t('hostHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={t('port')}
                        value={information.port}
                        onChange={goChange(constants.port)}
                        type="number"
                    />
                    <FormHelperText>{t('portHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`${t('topic')} *`}
                        value={information.topic}
                        onChange={goChange(constants.topic)}
                    />
                    <FormHelperText>{t('topicHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={t('username')}
                        value={information.username}
                        onChange={goChange(constants.username)}
                    />
                    <FormHelperText>{t('usernameHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={t('password')}
                        value={information.password}
                        onChange={goChange(constants.password)}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((show) => !show)}
                                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                        edge='end'
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormHelperText>{t('passwordHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`TLS: ${t('fqncacrt')}`}
                        value={information.certificates.fqncacrt}
                        onChange={goChange(constants.fqncacrt)}
                        type='file'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{t('fqncacrtHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`TLS: ${t('fqnclientcrt')}`}
                        value={information.certificates.fqnclientcrt}
                        onChange={goChange(constants.fqnclientcrt)}
                        type='file'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{t('fqnclientcrtHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`TLS: ${t('fqnclientkey')}`}
                        value={information.certificates.fqnclientkey}
                        onChange={goChange(constants.fqnclientkey)}
                        type='file'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{t('fqnclientkeyHelper')}</FormHelperText>
                </FormControl>
            </FormGroup>
        </AmbreCard>
    )
}
