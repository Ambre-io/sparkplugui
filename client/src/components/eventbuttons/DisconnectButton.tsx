import React from 'react';

import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';

import {AmbreIconButton} from "../ambre/AmbreIconButton";


export const DisconnectButton: React.FC = () => {

    const goClick = () => {};

    return <AmbreIconButton onClick={goClick} icon={<CloudOffOutlinedIcon/>}/>;
};
