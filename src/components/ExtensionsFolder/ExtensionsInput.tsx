import React,{useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import {addExtension} from '../../store/extensionsReducer';
import { callAlert } from '../../store/alertSlice';
import { v4 as uuidv4 } from "uuid";

type ExtensionList = {
    sku: string,
    priceListId: number
}

export default function ComboBox() {
    const dispatch = useAppDispatch();
    const {productList} = useAppSelector(state=>state.products);
    const {priceTable} = useAppSelector(state=>state.priceList);

    const {extensionList} = useAppSelector(state=>state.extension)

    const [selectedSku, setSelectedSku] = useState<string | null>(null);
    const [selectedPriceListId, setSelectedPriceListId] = useState<number | null>(null);

    const productListCopy = productList.map(el=>el.id);
    const priceListCopy = priceTable.map(el=>el.id);

    const handleAddExtension = () => {
        if (selectedSku && selectedPriceListId !== null) {
            const newExtension: ExtensionList = {
                sku: selectedSku,
                priceListId: selectedPriceListId,
            };
            const skuExist = extensionList.find(el => el.sku == selectedSku);

            if(extensionList && !skuExist){
                dispatch(addExtension([newExtension]));
                dispatch(callAlert([{text: "Successively added an exception.", type: "success", id:uuidv4()}]))
            } else {
                dispatch(callAlert([{text: "This sku has already been added.", type: "error", id: uuidv4()}]));
            }
        } else {
            console.error("Both SKU and PriceList ID must be selected");
            dispatch(callAlert([{text: "Both SKU and PriceList ID must be selected.", type: "error", id: uuidv4()}]));
        }
    };

    return (
        <>
            <Autocomplete
                disablePortal
                options={productListCopy}
                sx={{ width: 300, margin: "1rem auto 1rem" }}
                renderInput={(params) => <TextField {...params} label="Sku" />}
                onChange={(event, value) => setSelectedSku(value)}
            />
            <Autocomplete
                disablePortal
                options={priceListCopy}
                sx={{ width: 300, margin: "1rem auto 1rem" }}
                onChange={(event, value) => setSelectedPriceListId(value)}
                renderInput={(params) => <TextField {...params} label="PriceList ID" />}
            />
            <Button sx={{margin: "1rem 0 1rem"}} variant="contained" endIcon={<AddToPhotosIcon />} onClick={handleAddExtension}>
                ADD Exception
            </Button>
        </>
    );
}
