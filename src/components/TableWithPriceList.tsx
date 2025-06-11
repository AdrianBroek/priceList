import * as React from 'react';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removePriceList, editPriceListField } from '../store/priceSlice';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { SinglePriceListArea } from './types/SinglePriceList';
import { EditInputState } from './types/EditPricelist';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid';
import { callAlert } from '../store/alertSlice';
import { Extension } from '@mui/icons-material';
import { setOpenExtension } from '../store/extensionsReducer';
import Extensions from './ExtensionsFolder/Extensions';

interface Data {
    id: number,
    title: string,
    area: number,
    width: number,
    depth: number,
    height: number,
    weight: number,
    quantity: number,
}

function createData(
    id: number,
    title: string,
    area: number,
    width: number,
    depth: number,
    height: number,
    weight: number,
    quantity: number,
): Data {
  return {
    id,
    title,
    area,
    width,
    depth,
    height,
    weight,
    quantity,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: 'id',
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: 'title',
    },
    {
      id: 'area',
      numeric: true,
      disablePadding: false,
      label: 'area cm²',
    },
    {
      id: 'width',
      numeric: true,
      disablePadding: false,
      label: 'width',
    },
    {
      id: 'depth',
      numeric: true,
      disablePadding: false,
      label: 'depth',
    },
    {
      id: 'height',
      numeric: true,
      disablePadding: false,
      label: 'height',
    },
    {
      id: 'weight',
      numeric: true,
      disablePadding: false,
      label: 'weight',
    },
    {
      id: 'quantity',
      numeric: true,
      disablePadding: false,
      label: 'quantity',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  deleteHandler: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, deleteHandler } = props;
  const dispatch = useDispatch()


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Pricelists:
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Excepsions">
          <IconButton onClick={()=>dispatch(setOpenExtension(true))}>
            <Extension />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('width');
  const [selected, setSelected] = React.useState<readonly number[]>([]); // Zmieniony typ na number[]
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { priceTable } = useSelector((state: any) => state.priceList);
  const [rows, setRows] = React.useState<Data[]>([]);
  const {openExtensions, extensionList} = useSelector((state: any) => state.extension);
  
  React.useMemo(()=> {
    setRowsPerPage(priceTable.length) 
  },[priceTable])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const deleteHandler = () => {
    const newArr = [...selected]
    dispatch(removePriceList(newArr))
    dispatch(callAlert([{text: "Successfully removed chosen pricelist.", type: "success", id:uuidv4()}]))
  }


// edit handler
  const [editedInputs, setEditedInputs] = useState<SinglePriceListArea>({
    id: 0,
    title: '',
    area: 0,
    width: 0,
    depth: 0,
    height: 0,
    weight: 0,
    quantity: 0,
  })

  const editInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    switch(e.target.id) {
      case "title" :
        setEditedInputs(state => ({
          ...state,
          title: value
        }))
        break;
      case "depth" :
        setEditedInputs(state => ({
          ...state,
          depth: parseFloat(value)
        }))
        break;
      case "height" :
        setEditedInputs(state => ({
          ...state,
          height: parseFloat(value)
        }))
        break;
      case "width" :
        setEditedInputs(state => ({
          ...state,
          width: parseFloat(value)
        }))
        break;
      case "quantity" :
        setEditedInputs(state => ({
          ...state,
          quantity: parseFloat(value)
        }))
        break;
      case "weight" :
        setEditedInputs(state => ({
          ...state,
          weight: parseFloat(value)
        }))
        break;
    }
  }

   const [edit, setEdit] = useState({
    activeRow: 0,
    active: false,
    activeField: ''
  })
  
  const editInputHandlerClick = (id:number, field:string) => {
    if(!edit.active){
      setEdit((state) => ({
        activeRow: id,
        active: true,
        activeField: field
      }))
    }
  }
 
  const saveEditInput = (id:number, name:string) => {
    const inputName = name;
    const newValue = editedInputs[inputName];
    // console.log(newValue)
    const editedPriceTable = priceTable.filter((row:SinglePriceListArea) => row.id === id)[0]
    const prevValue = editedPriceTable[name];

    // reset inputs
    setEditedInputs({
      id: 0,
      title: '',
      area: 0,
      width: 0,
      depth: 0,
      height: 0,
      weight: 0,
      quantity: 0,
    })

    let editInput:EditInputState = {
      inputName: '',
      priceId: 0,
      newValue: ''
    }

    if(newValue === 0 || newValue === ''){
      editInput = {
        inputName: inputName,
        priceId: id,
        newValue: prevValue
      }
      dispatch(editPriceListField(editInput))
    }else {
      editInput = {
        inputName: inputName,
        priceId: id,
        newValue: newValue
      }
      dispatch(editPriceListField(editInput))
    }

    setEdit((state) => ({ 
      ...state,
      activeRow: 0,
      active: false
    }))
  }
  

  const visibleRows = React.useMemo(() =>
    stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
),[order, orderBy, page, rowsPerPage, rows, saveEditInput],);


React.useEffect(()=> {
  const mappedRows = priceTable.map((price: Data)=> ({
    id: price.id,
    title: price.title,
    area: price.area,
    width: price.width,
    depth: price.depth,
    height: price.height,
    weight: price.weight,
    quantity: price.quantity,
  }));

  setRows(mappedRows); 
  // console.log(mappedRows)
}, [priceTable])

React.useEffect(()=> {
  // console.log('gnow')
},[edit])

  return (
    <>
    {priceTable.length > 0 ? 
    <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
        numSelected={selected.length}
        deleteHandler={deleteHandler}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align='center'
                    >
                      {row.id}
                    </TableCell>
                    <TableCell 
                    style={edit.active && edit.activeRow == row.id && edit.activeField != "title"? {pointerEvents: "none"} : {pointerEvents: 'all'}} sx={{ position: 'relative' }} id="title" onClick={()=>editInputHandlerClick(row.id, "title")} align="left">
                      <p style={edit.active && edit.activeRow == row.id && edit.activeField == "title" ? {visibility: "hidden"} : {fontSize: 'visible'}}>
                      {row.title}
                      </p>
                      {edit.activeRow == row.id && edit.activeField == "title" ?
                        <EditedInputField className='title'>
                          <TextField placeholder='new' focused type='text' size="small" id="title" onChange={editInputHandler} label={row.title} variant="standard" />
                          <IconButton size="small" id="title" onClick={(e)=>saveEditInput(row.id,'title')} aria-label="check">
                            <CheckIcon />
                          </IconButton>
                        </EditedInputField>
                        : ""
                      }
                    </TableCell>

                    <TableCell align="right">
                    {parseFloat((row.area/100).toFixed(2))}
                    </TableCell>
                    <TableCell 
                    style={edit.active && edit.activeRow == row.id && edit.activeField != "width"? {pointerEvents: "none"} : {pointerEvents: 'all'}} sx={{ position: 'relative' }} id="width" onClick={()=>editInputHandlerClick(row.id, "width")} align="right">
                      <p style={edit.active && edit.activeRow == row.id && edit.activeField == "width" ? {visibility: "hidden"} : {fontSize: 'visible'}}>
                      {row.width}
                      </p>
                      {edit.activeRow == row.id && edit.activeField == "width" ?
                        <EditedInputField>
                          <TextField placeholder='new' focused type='number' size="small" id="width" onChange={editInputHandler} label={row.width} variant="standard" />
                          <IconButton size="small" id="width" onClick={(e)=>saveEditInput(row.id,'width')} aria-label="check">
                            <CheckIcon />
                          </IconButton>
                        </EditedInputField>
                        : ""
                      }
                    </TableCell>
                    <TableCell 
                    style={edit.active && edit.activeRow == row.id && edit.activeField != "depth"? {pointerEvents: "none"} : {pointerEvents: 'all'}} sx={{ position: 'relative' }} id="depth" onClick={()=>editInputHandlerClick(row.id, "depth")} align="right">
                      <p style={edit.active && edit.activeRow == row.id && edit.activeField == "depth" ? {visibility: "hidden"} : {fontSize: 'visible'}}>
                      {row.depth}
                      </p>
                      {edit.activeRow == row.id && edit.activeField == "depth" ?
                        <EditedInputField>
                          <TextField placeholder='new' focused type='number' size="small" id="depth" onChange={editInputHandler} label={row.depth} variant="standard" />
                          <IconButton size="small" id="depth" onClick={(e)=>saveEditInput(row.id,'depth')} aria-label="check">
                            <CheckIcon />
                          </IconButton>
                        </EditedInputField>
                        : ""
                      }
                    </TableCell>
                    <TableCell 
                    style={edit.active && edit.activeRow == row.id && edit.activeField != "height"? {pointerEvents: "none"} : {pointerEvents: 'all'}} sx={{ position: 'relative' }} id="height" onClick={()=>editInputHandlerClick(row.id, "height")} align="right">
                      <p style={edit.active && edit.activeRow == row.id && edit.activeField == "height" ? {visibility: "hidden"} : {fontSize: 'visible'}}>
                      {row.height}
                      </p>
                      {edit.activeRow == row.id && edit.activeField == "height" ?
                        <EditedInputField>
                          <TextField placeholder='new' focused type='number' size="small" id="height" onChange={editInputHandler} label={row.height} variant="standard" />
                          <IconButton size="small" id="height" onClick={(e)=>saveEditInput(row.id,'height')} aria-label="check">
                            <CheckIcon />
                          </IconButton>
                        </EditedInputField>
                        : ""
                      }
                    </TableCell>
                    <TableCell
                    style={edit.active && edit.activeRow == row.id && edit.activeField != "weight"? {pointerEvents: "none"} : {pointerEvents: 'all'}}
                    sx={{ position: 'relative' }} id="weight" onClick={()=>editInputHandlerClick(row.id, "weight")} align="right">
                      <p style={edit.active && edit.activeRow == row.id && edit.activeField == "weight"? {visibility: "hidden"} : {visibility: 'visible'}}>
                      {row.weight}
                      </p>
                      {edit.activeRow == row.id && edit.activeField == "weight" ?
                        <EditedInputField>
                          <TextField placeholder='new' focused type='number' size="small" id="weight" onChange={editInputHandler} label={row.weight} variant="standard" />
                          <IconButton size="small" id="weight" onClick={(e)=>saveEditInput(row.id,'weight')} aria-label="check">
                            <CheckIcon />
                          </IconButton>
                        </EditedInputField>
                        : ""
                      }
                    </TableCell>
                    <TableCell
                    style={edit.active && edit.activeRow == row.id && edit.activeField != "quantity"? {pointerEvents: "none"} : {pointerEvents: 'all'}}
                    sx={{ position: 'relative' }} id="quantity" onClick={()=>editInputHandlerClick(row.id, "quantity")} align="right">
                      <p style={edit.active && edit.activeRow == row.id && edit.activeField == "quantity"? {visibility: "hidden"} : {visibility: 'visible'}}>
                      {row.quantity}
                      </p>
                      {edit.activeRow == row.id && edit.activeField == "quantity" ?
                        <EditedInputField>
                          <TextField placeholder='new' focused type='number' size="small" id="quantity" onChange={editInputHandler} label={row.quantity} variant="standard" />
                          <IconButton size="small" id="quantity" onClick={(e)=>saveEditInput(row.id,'quantity')} aria-label="check">
                            <CheckIcon />
                          </IconButton>
                        </EditedInputField>
                        : ""
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {openExtensions ? <Extensions /> : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </Container>
    :""}
    </>
  );
}

const EditedInputField = styled.div`
  position: absolute;
  top: 25%;
  width: 45px;
  right: 0;
  transform: translateY(-25%);
  &.title {
    width: 100%;
  }
  button {
    top: 50%;
    transform: translateY(-50%);
    right: -30px;
    position: absolute;
  } 
  input {
    font-size: .8rem; 
  }
`