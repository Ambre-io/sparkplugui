/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";

import {AmbreButton} from "./AmbreButton.tsx";
import {AmbreDialogType} from '../../utils/types.ts';


export const AmbreDialog = (props: AmbreDialogType) => {

    const {title, content, goAgree, goDisagree, open, setOpen} = props;

    const {t} = useTranslation();

    const goDialogAgree = () => {
        if (goAgree !== undefined) goAgree();
        setOpen(false);
    };

    const goDialogDisagree = () => {
        if (goDisagree !== undefined) goDisagree();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <AmbreButton onClick={goDialogDisagree} startIcon={<CancelOutlinedIcon/>} autoFocus>
                    {t('disagree')}
                </AmbreButton>
                <AmbreButton onClick={goDialogAgree} startIcon={<TaskAltOutlinedIcon/>}>
                    {t('agree')}
                </AmbreButton>
            </DialogActions>
        </Dialog>
    );
};
