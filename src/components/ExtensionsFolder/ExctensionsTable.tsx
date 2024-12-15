import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeAllExtensions, removeExtension } from '../../store/extensionsReducer';
import { Tooltip } from '@mui/material';

function createData(
  sku: string,
  priceListId: number,
) {
  return {
    sku,
    priceListId
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const {productList} = useAppSelector(state=>state.products);
  const productDetail = productList.filter(product => product.id === row.sku);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.sku}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.priceListId}
        </TableCell>
        <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={()=>dispatch(removeExtension(row.sku))}
            >
              <DeleteIcon />
            </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Width</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell align="right">Depth</TableCell>
                    <TableCell align="right">Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productDetail.map((prod) => (
                    <TableRow key={prod.id}>
                      <TableCell component="th" scope="row">
                        {prod.width}
                      </TableCell>
                      <TableCell>{prod.height}</TableCell>
                      <TableCell align="right">{prod.depth}</TableCell>
                      <TableCell align="right">{prod.weight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
    const dispatch = useAppDispatch();
    const {openExtensions, extensionList} = useAppSelector(state => state.extension);

    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>SKU</TableCell>
                <TableCell align="right">PriceList ID</TableCell>
                <TableCell>
                  {extensionList.length > 0 && 
                  <Tooltip title="Delete all">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={()=>dispatch(removeAllExtensions())}
                  >
                    <DeleteSweepIcon />
                  </IconButton>
                  </Tooltip>}
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {extensionList.map((row) => (
                  <Row key={row.sku} row={row} />
              ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}