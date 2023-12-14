import {styled} from '@mui/system';
import {DataGrid} from "@mui/x-data-grid";

export const AmbreDataGrid = styled(DataGrid)(({theme}) => ({
    borderWidth: 0,
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none !important'
    },
    '& .MuiDataGrid-columnHeader': {
        outline: 'none !important'
    },
    '& .MuiDataGrid-row.Mui-selected': {
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.light,
        }
    },
    '& .MuiDataGrid-row:hover': {
        background: theme.palette.primary.light,
    }
}));
