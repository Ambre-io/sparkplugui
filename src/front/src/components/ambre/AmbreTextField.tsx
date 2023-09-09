import {styled} from '@mui/system';
import {TextField} from "@mui/material";


export const AmbreTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        color: theme.palette.primary.main,  // Writing text color
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.light
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
    },
}));
