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
// mui
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

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
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
                <Box sx={{ 
                    // maxHeight: '250px',
                }} >
                <Paper sx={{ 
                    height: '100%',
                    margin: 'auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                    }} >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={addNewPrice}
                    > 
                    <h2>Crate new pricelist:</h2>
                        <div>
                        <TextField required id="title" label="Title" variant="filled" onChange={inputHandler} type="text" placeholder="nazwa" />
                        <TextField required id="weight" label="weight" variant="filled" onChange={inputHandler} type="number" placeholder="maks waga" />
                        <TextField required id="height" label="height" variant="filled" onChange={inputHandler} type="number" placeholder="wysokosc" />
                        <TextField required id="width" label="width" variant="filled" onChange={inputHandler} type="number" placeholder="szerokosc" />
                        <TextField required id="depth" label="depth" variant="filled" onChange={inputHandler} type="number" placeholder="głębokość" />
                        <TextField required id="quantity" label="quantity" variant="filled" onChange={inputHandler} type="text" placeholder="Ilość elementów w paczce" />
                        </div>
                        <Button sx={{margin: '1rem'}} type="submit" variant="contained" endIcon={<SendIcon />}>
                            Add pricelist
                        </Button>
                    </Box>
                </Paper>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default PriceList