import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../hooks';
import Container from '@mui/material/Container';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'SKU',minWidth: 100 },
  { field: 'title', headerName: 'Title' ,minWidth: 600},
  { field: 'weight', headerName: 'weight' ,minWidth: 170},
  { field: 'width', headerName: 'width',minWidth: 170},
  { field: 'height', headerName: 'height',minWidth: 170 },
  { field: 'depth', headerName: 'depth',minWidth: 170},
];

const paginationModel = { page: 0, pageSize: 100 };

export default function DataTable() {
    const {productList} = useAppSelector(state => state.products);
    const rows = productList
    // console.log(rows)
  return (
    <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
        {rows ? (
          <Paper sx={{ height: rows.length > 100 ? 650 : 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
          </Paper>
        )
        : (
          <Paper sx={{ height: 400, width: '100%' }}>
           <DataGrid
                rows={[]}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
          </Paper>
        )}
    </Container>
  );
}