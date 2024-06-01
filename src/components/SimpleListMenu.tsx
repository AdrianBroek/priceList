import * as React from 'react';
import Button from '@mui/material/Button';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Grid from '@mui/material/Grid';

import { getAuth} from 'firebase/auth';
import { logoutUser } from '../store/userSlice';
import { resetPriceList } from '../store/priceSlice';
import { resetProducts } from '../store/productSlice';
// Avatar
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useAppSelector, useAppDispatch } from '../hooks'

export function ImageAvatars() {
    const userData = useAppSelector((state) => state.userData)
    return (
        <>
        {userData.logged && (
            <Stack direction="row" spacing={2}>
                <Avatar alt="Travis Howard" src={userData.photoUrl} />
            </Stack>
        )}
        </>
    );
  }

export default function BasicMenu() {
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.userData)
    const auth = getAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutCurrentUser = () => {
        auth.signOut()
        dispatch(logoutUser())
        dispatch(resetPriceList())
        dispatch(resetProducts())
        handleClose()
    }

  return (
    <Grid
    container
    direction="row"
    justifyContent="flex-end"
    alignItems="center"
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ImageAvatars />
      </Button>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>{userData.displayName}</MenuItem>
        <MenuItem>{userData.email}</MenuItem>
        <MenuItem onClick={handleClose}>
        <Button onClick={()=>logoutCurrentUser()} sx={{margin: '1rem'}} variant="contained" endIcon={<ExitToAppIcon />}>
            Logout
        </Button>
        </MenuItem>
      </Menu>
    </Grid>
  );
}