import {styled} from "@mui/system";

export const AmbreLightSpan = styled('span')(({theme}) => ({
    color: theme.palette.primary.light,
}));

export const AmbreMainSpan = styled('span')(({theme}) => ({
    color: theme.palette.primary.main,
}));

export const AmbreDarkSpan = styled('span')(({theme}) => ({
    color: theme.palette.primary.dark,
}));
