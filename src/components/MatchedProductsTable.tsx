import React, {useEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
// types
import {ProductsWithPriceList} from './types/ProductsWithPrice'
import { SinglePriceListArea } from "./types/SinglePriceList";

// options
import CopyOption from "./CopyOption";

// mui
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// components
import PriceListInfoPopover from "./PriceListInfoPopover";
import { useAppSelector } from "../hooks";

interface TableHeadColumns {
    id: 'title' | 'id' | 'weight' | 'width' | 'height' | 'depth' | 'priceListId'
    label: string,
    sorted: boolean,
    selected: boolean
}

type Sort = {
    sort: (
        id:'id' | 'title' | 'weight' | 'width' |
         'height' | 'depth' | 'priceListId',
        sorted: boolean,
        selected: boolean
        ) => void;
}

type TableHeadColumn  = {
    tableHeadColumn: TableHeadColumns[];
}

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

const TableHeadComponent = ({sort, tableHeadColumn}: Sort & TableHeadColumn) => {
    return (
        <TableHead>
            {tableHeadColumn && (
                <>
                    {tableHeadColumn.map((column) => (
                        <div onClick={()=>sort(column.id, column.sorted, column.selected)} key={column.id}>
                            {column.sorted ? <ArrowUpwardIcon sx={{ fontSize: 17 }} className={column.selected? 'active' : ""} /> : <ArrowUpwardIcon sx={{ fontSize: 17, transform: 'rotate(-180deg)' }} className={column.selected? 'active' : ""}/>}
                            <p>{column.label}</p>
                        </div>
                    ))}
                </>
            )}
        </TableHead>
    )
}

const MatchedProductsTable = ({activeTableWithSemicolon, setActiveTableSemicolon}
    : {
        activeTableWithSemicolon: string | null,
        setActiveTableSemicolon: (value: string | null)=> void
    }) => {
    const productsWithPrice = useSelector((state:any) => state.productsWithPrice)
    const [rows, setRows] = useState<ProductsWithPriceList[]>([])
    const [tableHeadColumn, setTableHeadColumn] = useState<TableHeadColumns[]>([
        {id: 'id', label: 'sku', sorted: false, selected: false},
        {id: 'title', label: 'name', sorted: false, selected: false},
        {id: 'width', label: 'width',sorted: false, selected: false},
        {id: 'height', label: 'height',sorted: false, selected: false},
        {id: 'weight', label: 'weight',sorted: false, selected: false},
        {id: 'depth', label: 'depth',sorted: false, selected: false},
        {id: 'priceListId', label: 'Pricelist ID',sorted: false, selected: false},
    ])

    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function sort(id: 'id' | 'title' | 'weight' | 'width' | 'height' | 'depth' | 'priceListId', sorted:boolean, selected: boolean) {

        const sortedChange = (changedId: string) => {
            const changeSort = tableHeadColumn.map((column)=> {
                if(column.id === changedId){
                    return { ...column, sorted: !column.sorted, selected: true}
                }else {
                    return { ...column, sorted: false, selected: false}
                }
            })
            setTableHeadColumn(changeSort)
        }

        const newArr = [...rows];
        if(!sorted){
            newArr.sort((a: ProductsWithPriceList, b: ProductsWithPriceList) => {
                const aValue = a[id];
                const bValue = b[id];
            
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                  // console.log(aValue)
                  return aValue.localeCompare(bValue);
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                  // console.log(bValue)
                  return aValue - bValue;
                } else {
                  return 0; // Nie można porównać, zwracamy 0
                }
            });
            sortedChange(id)
            
        }else {
            newArr.sort((a: ProductsWithPriceList, b: ProductsWithPriceList) => {
                const aValue = a[id];
                const bValue = b[id];
            
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                  // console.log(aValue)
                  return bValue.localeCompare(aValue);
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                  // console.log(bValue)
                  return bValue - aValue;
                } else {
                  return 0; // Nie można porównać, zwracamy 0
                }
            });
            // selectedChange(id)
            sortedChange(id)
        }
        setRows(newArr);
      }
      

    useEffect(()=> {
        setRows(productsWithPrice) 
    },[productsWithPrice])

    const theme = useSelector((state: any) => state.theme)

    return (
        <Container>
            {rows.length > 0 && ( 
                <>
                <TableOptions className={theme.mode =='light' ? 'light' : 'dark'}>
                <IconButton onClick={handleOpen} aria-label="options">
                    <SettingsIcon />
                </IconButton>
                </TableOptions>
                <Matchedtable className={theme.mode =='light' ? 'light' : 'dark'}>
                    <TableHeadComponent 
                    sort={sort} 
                    tableHeadColumn={tableHeadColumn} 
                    />
                    {rows.map((product:ProductsWithPriceList) => (
                        <>
                            <Table className={theme.mode =='light' ? 'light' : 'dark'}>
                                <TableRow>{product.id}</TableRow>
                                <TableRow>{product.title}</TableRow>
                                <TableRow>{product.width}</TableRow>
                                <TableRow>{product.height}</TableRow>
                                <TableRow>{product.weight}</TableRow>
                                <TableRow>{product.depth}</TableRow>
                                <TableRow>
                                    {product.priceListId}
                                    <PriceListInfoPopover priceId={product.priceListId}/>
                                </TableRow>
                            </Table>
                        </>
                    ))}
                    
                </Matchedtable>
                </>
                )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                    Table options
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Copy all the SKU's to your clipboard from chosen pricelist ID           
                    </Typography>
                    <CopyOption 
                    activeTableWithSemicolon={activeTableWithSemicolon}
                    setActiveTableSemicolon={setActiveTableSemicolon}/>
                </Box>
            </Modal>
        </Container>
    )
}

export default MatchedProductsTable

const Container = styled.section`
    overflow-x: auto;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`

const Matchedtable = styled.section`
    background-color: #121212;
    padding: 1rem 0;
    min-width: 730px;
    &.light {
        background-color: #ffffff;
    }
`

const Table = styled.div `
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    border-top: 1px solid rgba(81, 81, 81, 1);
    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
    }
    &.light {
        border-top: 1px solid rgba(224, 224, 224, 1);
        &:hover {
            background-color: rgba(0, 0, 0, 0.04);
        }
    }
`
const TableRow = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.875rem;
`

const TableHead = styled.div `
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.5rem;
    padding: 0 0 1rem;
    font-weight: 500;
    div {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
            opacity: 0;
            -webkit-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,-webkit-transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            margin-right: 3px;
            &.active {
                opacity: 1 !important;
            }
        }
        &:hover {
            opacity: .7;
            svg {
                opacity: 1;
            }
        }
    }
`

const TableOptions = styled.div`
    display: flex;
    justify-content: end;
    margin: auto 0 auto auto;
`