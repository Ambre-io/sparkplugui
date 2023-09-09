import {styled} from '@mui/system';
import {Button} from '@mui/material';

export const AmbreButton = styled(Button)(({theme}) => ({
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontWeight: 800,
    '&:hover': {
        background: theme.palette.primary.main,
        color: theme.palette.primary.light,
    }
}));
