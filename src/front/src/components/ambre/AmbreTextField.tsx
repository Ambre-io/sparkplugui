import {styled} from '@mui/system';
import {TextField} from "@mui/material";


export const AmbreTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        color: theme.palette.primary.dark,
        '& fieldset': {
            borderColor: theme.palette.primary.main
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.light
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
    },
}));
