import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Product } from "./types/Product";
import { SinglePriceList, SinglePriceListArea } from "./types/SinglePriceList";
import { ProductsWithPriceList } from "./types/ProductsWithPrice";
import { useDispatch } from "react-redux";
import { addProductsWithPrice } from "../store/productsWithPriceSlice";
// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MatchedProductsTable from "./MatchedProductsTable";

const MatchArea = () => {
    const {priceTable} = useSelector((state:any)=> state.priceList)
    const {productList} = useSelector((state:any)=> state.products)
    const productsWithPrice = useSelector((state:any) => state.productsWithPrice)
    const productsArray: ProductsWithPriceList[] = []
    const dispatch = useDispatch()

    // match products and add them to row state
    function matchProductsToPriceList(){
        // jesli sa produkty w state
        if(productList){
            // petla na kazdy produkt
            productList.map((product:Product)=> {
              // if product have sku
              if(product.id){
                // oblicz pp produktu

                // 200mm dla każdego boku, bo paczki są mniej więcej tak pakowane
                let additional = 50

                // // dla podtynkowych itemów
                // if(product.title.includes('Podtynkowa')
                // || product.title.includes('podtynkowa')){
                //     additional = 70
                // }
                
                // gabaryty + dodatkowy rozmiar
                let width = product.width + additional
                let height = product.height + additional
                let depth = product.depth + additional

                let prodArea: number = 0;
                if(depth && width && height){
                    prodArea = 2 * (depth * width + depth * height + width * height)
                }
                // jesli cennik w state
                if(priceTable && prodArea){
                    // posortuj wszystkie cenniki i umiesc je w zmiennej
                    const sortedData: SinglePriceListArea[] = [...priceTable].sort((a, b) => a.area - b.area);
                    // dla kazdego produktu zapetl kazdy cennik
                    for (const item of sortedData) {
                        if (prodArea < item.area && product.weight < item.weight) {
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

    return (
        <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
            <Box sx={{ 
                    // maxHeight: '250px',
            }}>
              <Button 
              sx={{margin: '0 auto 3rem'}}
              onClick={()=>matchProductsToPriceList()} 
              variant="contained">Match products to priceList
              </Button>
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














