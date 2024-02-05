import React, {useEffect, useState, useMemo} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { useAppSelector } from "../hooks";
import { SinglePriceListArea } from "./types/SinglePriceList";

type ID = {
    priceId: number;
}

export default function PriceListInfoPopover({priceId}: ID) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const {priceTable} = useAppSelector((state:any) => state.priceList);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    priselistInfoPopup();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [activePriceListInfo, setActivePriceListInfo] = useState<SinglePriceListArea | null>(null);

  function priselistInfoPopup(){
      const filteredPriceListData = priceTable?.filter((priceList:SinglePriceListArea) => priceList.id == priceId);
      setActivePriceListInfo(filteredPriceListData[0] || null)
      console.log(activePriceListInfo?.depth)

  }

  // console.log(activePriceListInfo)

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        <>
            <p>Title: {activePriceListInfo?.title}</p>
            <p>Weight: {activePriceListInfo?.weight}</p>
            <p>Height: {activePriceListInfo?.height}</p>
            <p>Width: {activePriceListInfo?.width}</p>
            <p>Depth: {activePriceListInfo?.depth}</p>
            <p>Quantity: {activePriceListInfo?.quantity}</p>
        </>
        </Typography>

      </Popover>
    </div>
  );
}