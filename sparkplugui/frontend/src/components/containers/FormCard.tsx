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

    const [filenames, setFilenames] = React.useState({
        [constants.cacrt]: '',
        [constants.clientcrt]: '',
        [constants.clientkey]: ''
    })

    const goChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        // for number: value = event.target.valueAsNumber;
        dispatch(setMQTTSetup({...information, [prop]: event.target.value} as core.MQTTSetup));
    };

    const goLoadFile = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null && event.target.files.length > 0) {
            setFilenames({...filenames, [prop]: event.target.value});
            console.log('event.target.files length', event.target.files.length, 'first file', event.target.files[0]);
            const file: File = event.target.files[0];
            let fileContent: string = '';
            file.arrayBuffer().then((fileBuffer: ArrayBuffer) => {
                console.log('fileBuffer', fileBuffer);
                const fileUint8Array = new Uint8Array(fileBuffer);
                console.log('fileUint8Array', fileUint8Array);
                fileContent = `[${fileUint8Array.toString()}]`;
                console.log('fileContent', fileContent);
                return fileContent;
            }).then((fileContent: string) => {
                console.log('before fileContent', fileContent);
                dispatch(setMQTTSetup({
                    ...information,
                    certificates: {
                        ...information.certificates,
                        [prop]: fileContent
                    }
                } as core.MQTTSetup));
            });
        }
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
                        label={`[TLS] ${t('username')}`}
                        value={information.username}
                        onChange={goChange(constants.username)}
                    />
                    <FormHelperText>{t('usernameHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`[TLS] ${t('password')}`}
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
                        label={`[TLS] ${t('cacrt')}`}
                        value={filenames.cacrt}
                        onChange={goLoadFile(constants.cacrt)}
                        type='file'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{t('cacrtHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`[TLS] ${t('clientcrt')}`}
                        value={filenames.clientcrt}
                        onChange={goLoadFile(constants.clientcrt)}
                        type='file'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{t('clientcrtHelper')}</FormHelperText>
                </FormControl>
                <FormControl sx={styles.paddingBottom(1)} fullWidth>
                    <AmbreTextField
                        label={`[TLS] ${t('clientkey')}`}
                        value={filenames.clientkey}
                        onChange={goLoadFile(constants.clientkey)}
                        type='file'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{t('clientkeyHelper')}</FormHelperText>
                </FormControl>
            </FormGroup>
        </AmbreCard>
    )
}
