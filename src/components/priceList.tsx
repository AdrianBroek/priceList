import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from '../hooks'
import { addPriceList, removePriceList } from "../store/priceSlice";
import { fetchPriceList } from "../actions/fetchPriceListData";
// types
import { SinglePriceList, SinglePriceListArea } from "./types/SinglePriceList";
// mui
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

const PriceList = () => {
    const dispatch = useAppDispatch()
    const {priceTable} = useSelector((state:any)=> state.priceList)
    const userData = useAppSelector((state) => state.userData)

    const [input, setInput] = useState<SinglePriceList>({
        id: 0,
        title: '',
        weight: 0,
        height: 0,
        width: 0,
        depth: 0,
        quantity: 0
    })

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

    function insertPriceListToDB() {
        if(userData){
          const databaseURL = 'https://tester-a7ca6-default-rtdb.europe-west1.firebasedatabase.app';
          const path = `/userId/${userData.id}.json`; // Ścieżka do danych w bazie

          fetch(databaseURL + path,{
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(priceTable)
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parsuj odpowiedź JSON
          })
          .then((data) => {
            // console.log('Zaktualizowane dane:', data);
          })
          .catch((error) => {
            console.error('Błąd aktualizacji danych:', error);
          });
        }
    }

    function addNewPrice(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (input.id >= 0 
            && input.title.length > 0 
            && input.weight > 0 
            && input.height > 0 
            && input.width > 0 
            && input.depth > 0 
            && input.quantity > 0 ){
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

    // after adding priceList add to database in firebase
    useEffect(()=> {
        if(userData){
            insertPriceListToDB()
        }
    }, [priceTable])

    // receive data from firebase after logged user
    useEffect(()=> {
        if(userData.logged && priceTable.length == 0){
            const promise = async () => {
                return await dispatch(fetchPriceList(`https://tester-a7ca6-default-rtdb.europe-west1.firebasedatabase.app/userId/${userData.id}.json`))

            }
            const promiseLoaded = async() => {
                const res = await promise()
                return res
            } 
            promiseLoaded().then((result) => {
                // console.log(result)
                if (result.payload) dispatch(addPriceList(result.payload))
            });
        }
    }, [userData])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" sx={{margin: '2rem auto'}}>
                <Box>
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
                        <Button sx={{margin: '1rem'}} type="submit" variant="contained" endIcon={<AddIcon />}>
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