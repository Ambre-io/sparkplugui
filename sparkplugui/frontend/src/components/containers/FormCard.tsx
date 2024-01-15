import React, {ChangeEvent} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {FormControl, FormGroup, FormHelperText, IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {AmbreCard} from "../ambre/AmbreCard.tsx";
import {AmbreTextField} from "../ambre/AmbreTextField.tsx";
import {constants} from "../../utils/constants.ts";
import {getMQTTData, setMQTTData} from "../../redux/data/mqttDataSlice.ts";
import {styles} from "../../styles/styles.ts";


export const FormCard: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const information = useSelector(getMQTTData);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const goChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        // let value: string | number = event.target.value
        // if (prop === constants.) value = event.target.valueAsNumber;
        dispatch(setMQTTData({...information, [prop]: event.target.value}));
    };

    return (
        <AmbreCard title={`${constants.emojiConnection} ${t('mqttInformation')}`}>
            <FormGroup>
                <FormControl sx={styles.formCardFirstInput} fullWidth>
                    <AmbreTextField
                        label={t('host')}
                        value={information.host}
                        onChange={goChange(constants.host)}
                    />
                    <FormHelperText>{t('hostHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.marginBottom1} fullWidth>
                    <AmbreTextField
                        label={t('port')}
                        value={information.port}
                        onChange={goChange(constants.port)}
                        type="number"
                    />
                    <FormHelperText>{t('portHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.marginBottom1} fullWidth>
                    <AmbreTextField
                        label={t('username')}
                        value={information.username}
                        onChange={goChange(constants.username)}
                    />
                    <FormHelperText>{t('usernameHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.marginBottom1} fullWidth>
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
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormHelperText>{t('passwordHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.marginBottom1} fullWidth>
                    <AmbreTextField
                        label={t('topic')}
                        value={information.topic}
                        onChange={goChange(constants.topic)}
                    />
                    <FormHelperText>{t('topicHelper')}</FormHelperText>
                </FormControl>
            </FormGroup>
        </AmbreCard>
    )
}
