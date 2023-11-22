import React, {ChangeEvent} from "react";

import {useMutation} from '@apollo/client';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Collapse, FormControl, FormGroup, FormHelperText, IconButton, InputAdornment} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {toast} from 'react-toastify';

import {AmbreButton} from "../ambre/AmbreButton";
import {AmbreExpandButton} from "../ambre/AmbreExpandButton";
import {AmbreTextField} from "../ambre/AmbreTextField";
import {constants} from "../../utils/constants";
import {getMQTTData, setMQTTData} from "../../redux/data/mqttDataSlice";
import {POST_MQTTDATA} from "../../graphql/graphql";
import {setReloadEvent} from "../../redux/events/reloadEventSlice";
import {styles} from "../../styles/styles";


export const MQTTDataForm: React.FC = () => {

    const information = useSelector(getMQTTData);
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const [expanded, setExpanded] = React.useState<boolean>(true);
    const goExpand = () => setExpanded(!expanded);

    const {t} = useTranslation();
    const success = () => toast(t('success'));
    const error = () => toast(t('error'));

    const goChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        // let value: string | number = event.target.value
        // if (prop === constants.) value = event.target.valueAsNumber;
        dispatch(setMQTTData({...information, [prop]: event.target.value}));
    };

    const [postMQTTData] = useMutation(POST_MQTTDATA);
    const goMutation = () => {
        postMQTTData({
            variables: {...information}
        }).then((res) => {
            const data = res.data.postMQTTData;
            if (data !== null && data) {
                dispatch(setReloadEvent()); // reload MQTT messages subscription
                success();
            } else {
                error();
            }
        }).catch((e) => {
            console.error('MQTTDataForm: mutation fail', e);
        });
    };

    return (
        <Grid container id='MQTTDataForm' sx={styles.ambreCard}>
            <Grid>
                <Grid container>
                    <Grid>
                        <AmbreExpandButton
                            expand={expanded}
                            onClick={goExpand}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </AmbreExpandButton>
                    </Grid>
                    <Grid>
                        <p style={styles.title}>{t('mqttDataFormTitle')}</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={styles.width100}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <FormGroup>
                        <FormControl sx={styles.marginBottom1} fullWidth>
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
                        <FormControl sx={styles.marginBottom1} fullWidth>
                            <AmbreButton
                                variant="contained"
                                onClick={goMutation}
                                endIcon={<CloudOutlinedIcon/>}
                            >
                                {t('connect')}
                            </AmbreButton>
                        </FormControl>
                    </FormGroup>
                </Collapse>
            </Grid>
        </Grid>
    )
}
