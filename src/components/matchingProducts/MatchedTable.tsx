import React, {useEffect, useState, useMemo} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
// components
import PriceListInfoPopover from "../PriceListInfoPopover";
import { 
    DataGrid, 
    GridToolbarContainer,
    GridColDef, 
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CopyOption from '../CopyOption';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
// types
import { ProductsWithPriceList } from '../types/ProductsWithPrice';

const columns: GridColDef[] = [
  { field: 'id',        headerName: 'SKU',         minWidth: 100 },
  { field: 'title',     headerName: 'Title' ,   minWidth: 600},
  { field: 'weight',    headerName: 'weight' , minWidth: 170},
  { field: 'width',     headerName: 'width',    minWidth: 170},
  { field: 'height',    headerName: 'height',  minWidth: 170 },
  { field: 'depth',     headerName: 'depth',    minWidth: 170},
  { field: 'priceListId',headerName: 'price ID',    minWidth: 170,
    renderCell: (params) => <>{params.row.priceListId}<PriceListInfoPopover priceId={params.row.priceListId}/></>
  },
];

// for modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type MatchedTableProps = {
    activeTableWithSemicolon: string | null;
    setActiveTableSemicolon: (value: string | null)=> void;
}

const CustomToolbar = ({activeTableWithSemicolon, setActiveTableSemicolon}: MatchedTableProps) => {
    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
            <Button onClick={handleOpen} aria-label="options" startIcon={<SettingsIcon />}><p style={{margin: 0, fontSize: 13}}>Copy</p></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={style}>
                    <Typography variant="h6" component="h2">
                    Table options
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Copy all the SKU's to your clipboard from chosen pricelist ID           
                    </Typography>
                    <CopyOption 
                    activeTableWithSemicolon={activeTableWithSemicolon}
                    setActiveTableSemicolon={setActiveTableSemicolon}/>
                </Paper>
            </Modal>
        </GridToolbarContainer>
    )
}

const paginationModel = { page: 0, pageSize: 5 };

export default function MatchedTable({
    activeTableWithSemicolon, 
    setActiveTableSemicolon
    }: MatchedTableProps): JSX.Element {
    const data = useAppSelector(state => state.productsWithPrice);
    const [rows, setRows] = useState<ProductsWithPriceList[]>([]);

    const dataInput = useMemo(()=> {
        setRows(data)
    }, [data])

    return (
        <Paper sx={{ height: 700, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 20, 50, 100]}
            disableRowSelectionOnClick
            components={{
                Toolbar: CustomToolbar,
            }}
            componentsProps={{
                toolbar: {
                    activeTableWithSemicolon,
                    setActiveTableSemicolon
                }
            }}
        />
        </Paper>
    );
}