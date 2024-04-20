import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Product } from "./types/Product";
import { SinglePriceListArea } from "./types/SinglePriceList";
import { ProductsWithPriceList } from "./types/ProductsWithPrice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addProductsWithPrice } from "../store/productsWithPriceSlice";
import { callAlert } from "../store/alertSlice";
import {v4 as uuidv4} from 'uuid';
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MatchedProductsTable from "./MatchedProductsTable";

import BoxAnimIcon from '../images/barcode.gif'
import BoxIcon from '../images/box-white.png'

import { checkSizes } from "../functions/checkSizes";


const MatchArea = () => {
    const {priceTable} = useAppSelector((state:any)=> state.priceList)
    const {productList} = useAppSelector((state:any)=> state.products)
    const {value} = useAppSelector((state) => state.sort)
    const productsWithPrice = useAppSelector((state:any) => state.productsWithPrice)
    const {sizeA, sizeB, sizeC} = useAppSelector(state => state.additional.sizes)
    const dispatch = useAppDispatch()

    // match products and add them to row state
    const matchProductsToPriceList = useMemo(() => {
        return () => {
            const productsArray: ProductsWithPriceList[] = []
            // jesli sa produkty w state
            if(productList){
                // console.log(productList.length>0)
                // petla na kazdy produkt
                productList.forEach((product:Product)=> {
                    // if product have sku && dimensions !=0
                    if(product.id
                        && product.width
                        && product.height
                        && product.weight
                        && product.depth){
                        
                        // gabaryty + dodatkowy rozmiar
                        let width = product.width + sizeB
                        let height = product.height + sizeA
                        let depth = product.depth + sizeC

                        // oblicz pp produktu
                        let prodArea: number = 0;
                        if(depth && width && height){
                            prodArea = 2 * (depth * width + depth * height + width * height)
                            // prodArea = prodArea / 100;
                        }
                        // jesli cennik w state && istnieje area
                        if(priceTable && prodArea){
                            // posortuj wszystkie cenniki i umiesc je w zmiennej
                            const sortedData: SinglePriceListArea[] = [...priceTable].sort((a, b) => {
                                // Dynamically access the property based on the value from Redux state
                                const aValue = a[value];
                                const bValue = b[value];
                              
                                // Perform comparison based on the accessed property
                                if (aValue < bValue) {
                                  return -1;
                                } else if (aValue > bValue) {
                                  return 1;
                                } else {
                                  return 0;
                                }
                              });
                            // dla kazdego produktu zapetl kazdy cennik
                            for (const priceL of sortedData) {
                                if (
                                    // pole powierzchni mniejsze niz cennika
                                    prodArea < priceL.area 
                                    // waga produktu < waga cennika
                                    && product.weight < priceL.weight
                                    // maksymalny gabaryt produktu < maksymalny gabaryt cennika
                                    // && Math.max(depth, width, height) < Math.max(priceL.depth, priceL.width, priceL.height)
                                    && checkSizes(width, height, depth, priceL)    
                                ) {
                                    // console.log(Math.max(depth, width, height))
                                    // console.log(Math.max(priceL.depth, priceL.width, priceL.height))
                                    

                                    productsArray.push({
                                        id: product.id,
                                        title: product.title,
                                        width: width,
                                        height: height,
                                        weight: product.weight,
                                        depth: depth,
                                        priceListId: priceL.id,
                                    });
                                    break;
                                }
                            }
                        }
                    }
                })
                // po przypisaniu produktow z cennikami
                // wyslij produkty do state
                dispatch(addProductsWithPrice(productsArray))
                dispatch(callAlert([{text: "Successfully added matched your products.", type: "success", id:uuidv4()}]))
            }
        };
    }, [productList, sizeA, sizeB, sizeC]);

    // hover button effect
    const [hover, setHover] = useState(false)

    return (
        <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
            <Box sx={{ 
                // maxHeight: '250px',
            }}>
                {productList != null && productList.length > 0 && (
                    <Button 
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    sx={{margin: '0 auto 3rem'}}
                    onClick={()=>matchProductsToPriceList()} 
                    variant="text">
                        Match products to pricelists
                        <ImageContainer>
                            <div>
                                <img width="70px" src={hover ? BoxAnimIcon : BoxIcon} />
                            </div>
                        </ImageContainer>
                    
                    </Button>
                )}

            </Box>
        </Container>
    )
}

export default MatchArea


const ImageContainer = styled.div`
    margin-left: .5rem;
    div {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 50%;
        overflow: hidden;
        width: 70px;
        height: 70px;
    }
`














