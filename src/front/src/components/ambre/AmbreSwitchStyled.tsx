import {alpha, styled} from '@mui/material/styles';

import {Switch} from '@mui/material';

export const AmbreSwitchStyled = styled(Switch)(({theme}) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
    },
}));
