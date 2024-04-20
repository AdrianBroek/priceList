import React, {useMemo, useState} from "react";
// types
import { SinglePriceList } from "./types/SinglePriceList";
import { sortOptions } from "./types/SortType";
// mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from "../hooks";
import { sort } from "../store/sortReducer";
import { Container } from "@mui/material";

const SortChange = () => {
    const {value} = useAppSelector((state) => state.sort)
    const dispatch = useAppDispatch()

    // mui select
    const sortOptionsArray = ['area', 'weight']

    const handleChange = (event: SelectChangeEvent<string>) => {
        const ev: string = event.target.value;
        dispatch(sort(ev))
    };

    return (
        <Container maxWidth="sm">
            <h2>Select your pricelist sort value</h2>
            <p>Your product will search through all available pricelists to find the nearest compatible one. Choose the sorting option for the pricelists to prioritize matching them with the product.</p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>Sort Value</InputLabel>
            <Select
                value={value}
                label="SortValue"
                onChange={handleChange}
            >
                
                {value ? sortOptionsArray.map((sortValue:string, index: number) => (
                    <MenuItem key={index} value={sortValue}>{sortValue}</MenuItem>))
                : <MenuItem value="0">
                <em>None</em>
                </MenuItem>
                }
            </Select>
            </FormControl>
        </Container>
    )
}

export default SortChange