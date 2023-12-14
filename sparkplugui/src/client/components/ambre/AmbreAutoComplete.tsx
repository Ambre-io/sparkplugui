import {styled} from '@mui/system';
import {Autocomplete} from '@mui/material';

export const AmbreAutoComplete = styled(Autocomplete)(({theme}) => ({
    '& .MuiChip-root': { // MuiButtonBase-root-MuiChip-root
        color: theme.palette.primary.main,
        background: theme.palette.primary.light
    },
}));
