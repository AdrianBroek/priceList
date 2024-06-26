import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AdditionalType } from './types/AdditionalType';
import { setAdditionalSizes } from '../store/additionalSizesReducer';
import Paper from '@mui/material/Paper';
import WareHouseIMG from '../images/warehouse_09.webp'

const BoxSizes = () => {
    const dispatch = useAppDispatch()
    const {sizeA, sizeB, sizeC} = useAppSelector(state => state.additional.sizes)

    // edit handler
    const [inputs, setInputs] = useState<AdditionalType["sizes"]>({
        sizeA: sizeA,
        sizeB: sizeB,
        sizeC: sizeC
    })

    useEffect(()=> {
        // console.log(inputs)
        dispatch(setAdditionalSizes(inputs))
    }, [inputs])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = parseFloat(e.target.value);

        switch(e.target.id) {
        case "size-a-input" :
            setInputs(state => ({
                ...state,
                sizeA: value
            }));
            break;
        case "size-b-input" :
            setInputs(state => ({
                ...state,
                sizeB: value
            }));
            break;
        case "size-c-input" :
            setInputs(state => ({
                ...state,
                sizeC: value
            }));
            break;
        }
    }
    return (
        <Container maxWidth="xl" sx={{margin: '2rem auto', padding: '1rem 0'}}>
            <Paper sx={{ 
                height: '100%',
                margin: 'auto',
                padding: "2rem 2rem 4rem 2rem"
            }} >
            <h2>Add a additional sizes to your box [mm]</h2>
            <Box sx={{ flexGrow: 1 , position: 'relative', maxWidth: 700, margin: 'auto'}}>
            <Grid container spacing={2}>

                <Grid xs={12}spacing={2}>
                    <InputSize className='size-a'>
                        <TextField type='number' onChange={inputHandler} focused value={inputs.sizeA} id="size-a-input" label="add-height"  variant="outlined" />
                    </InputSize>
                    <InputSize className='size-b'>
                        <TextField type='number' onChange={inputHandler} focused value={inputs.sizeB} id="size-b-input" label="add-width"  variant="outlined" />
                    </InputSize>
                    <InputSize className='size-c'>
                        <TextField type='number' onChange={inputHandler} focused value={inputs.sizeC} id="size-c-input" label="add-depth"  variant="outlined" />
                    </InputSize>
                </Grid>
                <Grid xs={
                    12
                    }
                spacing={2}>
                <BoxSize>
                    <div className="boxImage">
                        <img src={WareHouseIMG} />
                    </div>
                    
                </BoxSize>    
                </Grid>
            </Grid>
            </Box>
            </Paper>
        </Container >
    )
}

const InputSize = styled.div`
    position: absolute;
    width: 90px;
    z-index: 2;
    &.size-a {
        top: 25%;
    }
    &.size-b {
        top: 75%;
    }
    &.size-c {
        top: 50%;
        right: 0;
    }
    @media (max-width: 600px) {
        position: unset;
        width: 100%;
        margin: 1rem 0;
    }
`

const BoxSize = styled.div`
    
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .boxImage {
        height: 350px;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .square {
        position: relative;
        border: 2px solid #696767;
        width: 200px;
        height: 150px;
        &.st {
            margin-right: -25px;
            margin-bottom: -70px;
        }
        &.sec {
            margin-left: -25px;
            margin-top: -70px;
        }
    }
    .lane {
        position: absolute;
        height: 2px;
        background-color: #696767;
        &.st {
            width: 85%;
            bottom: 124%;
            left: -4%;
            transform: rotate(335deg);
        }
        &.sec {
            width: 85%;
            bottom: 124%;
            right: -81%;
            transform: rotate(335deg);
        }
        &.rd {
            width: 85%;
            bottom: 23%;
            left: -4%;
            transform: rotate(335deg);
        }
        &.th {
            width: 85%;
            bottom: 23%;
            right: -81%;
            transform: rotate(335deg);
        }
    }
`

export default BoxSizes