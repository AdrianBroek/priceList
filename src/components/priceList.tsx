import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPriceList } from "../store/priceSlice";
// types
import { SinglePriceList, SinglePriceListArea } from "./types/SinglePriceList";
// style
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {removePriceList} from "../store/priceSlice"


const PriceList = () => {
    const dispatch = useDispatch()
    const {priceTable} = useSelector((state:any)=> state.priceList)

    const [input, setInput] = useState<SinglePriceList>({
        id: 0,
        title: '',
        weight: 0,
        height: 0,
        width: 0,
        depth: 0,
        quantity: 0
    })

    useEffect(()=> {
        // console.log(priceTable)
    }, [])

    function inputHandler(e:React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value
        // console.log(e.target.id)
        switch(e.target.id){
            case "title" :
                setInput((state: SinglePriceList) => ({
                    ...state,
                    title: value
                }))
                break;
            case "weight" :
                setInput((state: SinglePriceList) => ({
                    ...state,
                    weight: parseFloat(value)
                }))
                break;
            case "height" :
                setInput((state: SinglePriceList) => ({
                    ...state,
                    height: parseFloat(value)
                }))
                break;
            case "width" :
                setInput((state: SinglePriceList) => ({
                    ...state,
                    width: parseFloat(value)
                }))
                break;
            case "depth" :
                setInput((state: SinglePriceList) => ({
                    ...state,
                    depth: parseFloat(value)
                }))
                break;
            case "quantity" :
                setInput((state: SinglePriceList) => ({
                    ...state,
                    quantity: parseFloat(value)
                }))
                break;
            default: 
                break;
        }
    }

    function addNewPrice(e:React.FormEvent<HTMLFormElement>) {
        // console.log(e)
        e.preventDefault()
        if (input){
            const newPriceTable: SinglePriceListArea[] = [
                {
                    id: input.id+=1,
                    title: input.title,
                    weight: input.weight,
                    height: input.height,
                    width: input.width,
                    depth: input.depth,
                    quantity: input.quantity,
                    area: parseFloat(((2 * (input.depth * input.width + input.depth * input.height + input.width * input.height)) / input.quantity).toFixed(2))
                }
            ]
            dispatch(addPriceList(newPriceTable))
        }
    }

    return (
        <>
        <form onSubmit={addNewPrice}> 
        <h2>Utwórz nowy cennik:</h2>
            <input id="title" onChange={inputHandler} type="text" placeholder="nazwa"></input>
            <input id="weight" onChange={inputHandler} type="number" placeholder="maks waga" />
            <input id="height" onChange={inputHandler} type="number" placeholder="wysokosc" />
            <input id="width" onChange={inputHandler} type="number" placeholder="szerokosc" />
            <input id="depth" onChange={inputHandler} type="number" placeholder="głębokość" />
            <input id="quantity" onChange={inputHandler} type="text" placeholder="Ilość elementów w paczce" />
            <button type="submit">KLIKC</button>
        </form>
        {/* {priceTable.length > 0 ? 
            <section className="pricelist-container table">
                {priceTable.map((el:SinglePriceList)=> (
                    <Table className="price-single">
                        <div>{el.title}</div>
                        <div>{el.weight}</div>
                        <div>{el.height}</div>
                        <div>{el.width}</div>
                        <div>{el.depth}</div>
                        <div>{el.quantity}</div>
                        <button onClick={()=>dispatch(removePriceList(el.id))}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </Table>
                ))}
            </section>  
        :<p>No pricelist added</p>
        } */}
        </>
    )
}

export default PriceList


const Table = styled.section`
  font-size: 1.25rem;
  text-align: center;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr .5fr;
  padding: 1rem;
  place-content: center;
`;