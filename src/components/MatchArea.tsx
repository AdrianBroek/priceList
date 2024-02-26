import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Product } from "./types/Product";
import { SinglePriceList, SinglePriceListArea } from "./types/SinglePriceList";
import { ProductsWithPriceList } from "./types/ProductsWithPrice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addProductsWithPrice } from "../store/productsWithPriceSlice";
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MatchedProductsTable from "./MatchedProductsTable";

import BoxAnimIcon from '../images/barcode.gif'
import BoxIcon from '../images/box-white.png'


const MatchArea = () => {
    const {priceTable} = useAppSelector((state:any)=> state.priceList)
    const {productList} = useAppSelector((state:any)=> state.products)
    const productsWithPrice = useAppSelector((state:any) => state.productsWithPrice)
    const {sizeA, sizeB, sizeC} = useAppSelector(state => state.additional.sizes)
    const dispatch = useAppDispatch()

    const productsArray: ProductsWithPriceList[] = []

    // match products and add them to row state
    function matchProductsToPriceList(){
        // jesli sa produkty w state
        if(productList){
            // petla na kazdy produkt
            productList.map((product:Product)=> {
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
                }
                // jesli cennik w state && istnieje area
                if(priceTable && prodArea){
                    // posortuj wszystkie cenniki i umiesc je w zmiennej
                    const sortedData: SinglePriceListArea[] = [...priceTable].sort((a, b) => a.area - b.area);
                    // dla kazdego produktu zapetl kazdy cennik
                    for (const item of sortedData) {
                        if (prodArea < item.area && product.weight < item.weight
                            && product.width < item.width
                            && product.height < item.height
                            && product.depth < item.depth
                            ) {
                            productsArray.push({
                                id: product.id,
                                title: product.title,
                                width: product.width,
                                height: product.height,
                                weight: product.weight,
                                depth: product.depth,
                                priceListId: item.id,
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
        }
    }

    // hover button effect
    const [hover, setHover] = useState(false)

    return (
        <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
            <Box sx={{ 
                // maxHeight: '250px',
            }}>
                {productList.length > 0 && (
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
            <Box>
                {productsWithPrice && (
                    <MatchedProductsTable />
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














