import React, {useEffect, useMemo, useState} from 'react'
import {v4 as uuidv4} from 'uuid';
// redux
import { useAppSelector, useAppDispatch } from '../hooks';
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import MatchedProductsTable from "../components/MatchedProductsTable";
import { callAlert } from '../store/alertSlice';

const ProductListPage = () => {
    const dispatch = useAppDispatch();
    const productsWithPrice = useAppSelector((state:any) => state.productsWithPrice)
    const [activeTableWithSemicolon, setActiveTableSemicolon] = useState<string | null>(null)

    useEffect(()=> {
        if (activeTableWithSemicolon !== null) {
            dispatch(callAlert([{text: 'Copied to clickboard',type: 'info', id: uuidv4()}]))
        }
    }, [activeTableWithSemicolon])

    return (
        <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
            <Box>
                {productsWithPrice.length > 0 ? (
                    <MatchedProductsTable 
                    activeTableWithSemicolon={activeTableWithSemicolon}
                    setActiveTableSemicolon={setActiveTableSemicolon} />
                ):<p>A list of products with an assigned price list will appear here.</p>}
            </Box>
        </Container>
    )
}

export default ProductListPage