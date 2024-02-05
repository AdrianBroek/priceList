import React, {useMemo, useState} from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import copyToClipboard from "../functions/CopyToClipboard";
// types
import { SinglePriceList } from "./types/SinglePriceList";
import { ProductsWithPriceList } from "./types/ProductsWithPrice";
// mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyOption = () => {

    const productsWithPrice = useAppSelector(state=> state.productsWithPrice)
    const {data} = useAppSelector(state=> state.priceListToUser)
    
    const dispatch = useAppDispatch

    const [activeTable, setActiveTable] = useState<SingleProductTable[]>([{
        id: ""
    }])

    const [activeTableWithSemicolon, setActiveTableSemicolon] = useState<String>()

    const makeSkuCopyObject = useMemo(()=> {
        // console.log(activeTableWithSemicolon)
        copyToClipboard(activeTableWithSemicolon)
    }, [activeTableWithSemicolon])

    interface SingleProductTable {
        id: string;
    }

    // mui select
    const [copyId, setCopyId] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<number | string>) => {
        const eventToNb: string = event.target.value.toString();
        setCopyId(eventToNb);
    };

    function pickTableId(id:string) {
        const parsedId = parseFloat(id)
        const productsWithPriceCopy = [...productsWithPrice]
        const filterResult = productsWithPriceCopy.filter((prod:ProductsWithPriceList)=> prod.priceListId == parsedId)
        // console.log(filterResult)
        const newArray: string[] = [];
        filterResult.forEach((prod:ProductsWithPriceList) => {
            newArray.push(prod.id)
        })
        newArray.join(';')
        // console.log(newArray.join(';'))
        setActiveTableSemicolon(newArray.join(';'))
        
    }

    return (
        <>
            <Button
            sx={{ m: 1, minWidth: 120 }}
            onClick={()=>pickTableId(copyId)} 
            variant="outlined" 
            startIcon={<ContentCopyIcon />}>
            Copy SKU's
            </Button>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Pricelist ID</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={copyId}
                label="copyId"
                onChange={handleChange}
            >
                <MenuItem value="0">
                <em>None</em>
                </MenuItem>
                {data.length > 0 ? data.map((pricelist:SinglePriceList) => (
                    <MenuItem value={pricelist.id}>{pricelist.id}</MenuItem>))
                : ""
                }
            </Select>
            </FormControl>
        </>
    )
}

export default CopyOption