import React, {useEffect, useMemo, useState} from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
// types
import {ProductsWithPriceList} from './types/ProductsWithPrice'
import { SinglePriceListArea } from "./types/SinglePriceList";
// mui
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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

export const TableHeadComponent = ({sort, tableHeadColumn}: Sort & TableHeadColumn) => {
    
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

const MatchedProductsTable = () => {

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

    return (
        <Container>
            {rows.length > 0 && ( 
                <Matchedtable>
                    <TableHeadComponent 
                    sort={sort} 
                    tableHeadColumn={tableHeadColumn} 
                    />
                    {rows.map((product:ProductsWithPriceList) => (
                        <>
                            <Table>
                                <TableRow>{product.id}</TableRow>
                                <TableRow>{product.title}</TableRow>
                                <TableRow>{product.width}</TableRow>
                                <TableRow>{product.height}</TableRow>
                                <TableRow>{product.weight}</TableRow>
                                <TableRow>{product.depth}</TableRow>
                                <TableRow>{product.priceListId}</TableRow>
                            </Table>
                        </>
                    ))}
                </Matchedtable>
                )}

        </Container>
    )
}

export default MatchedProductsTable

const Container = styled.section`
    overflow-x: auto;
`

const Matchedtable = styled.section`
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
    border-radius: 4px;
    background-color: #121212;
    padding: 1rem 0;
    min-width: 730px;
`

const Table = styled.div `
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    border-top: 1px solid rgba(81, 81, 81, 1);
    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
    }
`
const TableRow = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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