import React, {useMemo, useState} from 'react'
import uuid from 'react-uuid';
// redux
import { useAppSelector, useAppDispatch } from '../hooks';
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import MatchedProductsTable from "../components/MatchedProductsTable";
import AlertComponent from '../components/Alert';
import { callAlert } from '../store/alertSlice';

const ProductListPage = () => {
    const dispatch = useAppDispatch();
    const productsWithPrice = useAppSelector((state:any) => state.productsWithPrice)
    const [activeTableWithSemicolon, setActiveTableSemicolon] = useState<string | null>(null)

    const makeAlert = useMemo(()=> {
        dispatch(callAlert([{text: 'Copied to clickboard',type: 'info', id: uuid()}]))
    }, [activeTableWithSemicolon])

    return (
        <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
            {/* {activeTableWithSemicolon && (
                
                // <AlertComponent text='Copied to clickboard' type='info'/>
            )} */}
            <Box>
                {productsWithPrice.length > 0 ? (
                    <MatchedProductsTable 
                    activeTableWithSemicolon={activeTableWithSemicolon}
                    setActiveTableSemicolon={setActiveTableSemicolon} />
                ):<p>List of matched products to a pricelist will be listed in here.</p>}
            </Box>
        </Container>
    )
}

export default ProductListPage