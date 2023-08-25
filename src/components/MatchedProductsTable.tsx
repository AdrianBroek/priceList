import React, {useState} from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
// types
import {ProductsWithPriceList} from './types/ProductsWithPrice'

interface TableHeadColumns {
    id: 'title' | 'id' | 'weight' | 'width' | 'height' | 'depth' | 'PriceListId'
    label: string,
}

const TableHeadColumn: TableHeadColumns[] = [
    {id: 'id', label: 'sku'},
    {id: 'title', label: 'name'},
    {id: 'width', label: 'width'},
    {id: 'height', label: 'height'},
    {id: 'weight', label: 'weight'},
    {id: 'depth', label: 'depth'},
    {id: 'PriceListId', label: 'Pricelist ID'},
]

export const TableHeadComponent = () => {
    const [tableHead, setTableHead] = useState(TableHeadColumn)
    return (
        <TableHead>
            {tableHead && (
                <>
                    {tableHead.map((column) => (
                        <div key={column.id}>
                            {column.label}
                        </div>
                    ))}
                </>
            )}
        </TableHead>
    )
}

const MatchedProductsTable = () => {

    const productsWithPrice = useSelector((state:any) => state.productsWithPrice)
    

    console.log(TableHeadColumn)
    return (
        <section>
            {productsWithPrice && ( 
                <Matchedtable>
                    <TableHeadComponent />
                    {productsWithPrice.map((product:ProductsWithPriceList) => (
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

        </section>
    )
}

export default MatchedProductsTable

const Matchedtable = styled.section`
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
    border-radius: 4px;
    background-color: #121212;
    padding: 1rem 0;
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
`