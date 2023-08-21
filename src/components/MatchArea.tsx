import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Product } from "./types/Product";
import { SinglePriceList, SinglePriceListArea } from "./types/SinglePriceList";
import { ProductsWithPriceList } from "./types/ProductsWithPrice";
import { useDispatch } from "react-redux";
import { addProductsWithPrice } from "../store/productsWithPriceSlice";

const MatchArea = () => {
    const {priceTable} = useSelector((state:any)=> state.priceList)
    const {productList} = useSelector((state:any)=> state.products)
    const productsWithPrice = useSelector((state:any)=> state.productsWithPrice)

    const productsArray: ProductsWithPriceList[] = []

    const dispatch = useDispatch()

    function matchProductsToPriceList(){
        // jesli sa produkty w state
        if(productList){
            // petla na kazdy produkt
            productList.map((product:Product)=> {
                // oblicz pp produktu
                let prodArea: number = 0;
                if(product.depth && product.width && product.height){
                    prodArea = 2 * (product.depth * product.width + product.depth * product.height + product.width * product.height)
                }
                // jesli cennik w state
                if(priceTable && prodArea){
                    // posortuj wszystkie cenniki i umiesc je w zmiennej
                    const sortedData: SinglePriceListArea[] = [...priceTable].sort((a, b) => a.area - b.area);
                    // dla kazdego produktu zapetl kazdy cennik
                    for (const item of sortedData) {
                        console.log(product)
                        console.log(prodArea)
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
                            console.log(item.id)
                            break;
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
        <section id="match-area">
            <button onClick={()=>matchProductsToPriceList()}>
                Match products to priceList
            </button>
            {productsWithPrice && (
                <Table>
                {productsWithPrice.map((prod:ProductsWithPriceList)=> (
                    <>
                        <p>{prod.id}</p>
                        <p>{prod.title}</p>
                        <p>{prod.height}</p>
                        <p>{prod.width}</p>
                        <p>{prod.depth}</p>
                        <p>{prod.priceListId}</p>
                    </>
                ))}
                

                </Table>
            )}
        </section>
    )
}

export default MatchArea

const Table = styled.section`
  font-size: 1.25rem;
  text-align: center;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  place-content: center;
`;