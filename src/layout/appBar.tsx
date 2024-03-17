import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import GoogleAuth from '../components/googleAuth';
import ModeSwitch from '../components/modeSwitch';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import logoIcon from '../images/package.png'

const pages = ['How-to'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoIcon>
            <img width="35px" src={logoIcon} />
          </LogoIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={()=>navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: "pointer"
            }}
          >
            PriceListApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={()=>navigate('/how-to')} textAlign="center">How-to</Typography>
                </MenuItem>
              <ModeSwitch />
            </Menu>
          </Box>
          <LogoIconMobile>
            <img width="35px" src={logoIcon} />
          </LogoIconMobile>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={()=>navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.0rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: "pointer"
            }}
          >
            PriceListApp
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>navigate('/how-to')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <ModeSwitch />
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
            <GoogleAuth />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

const LogoIcon = styled.div`
    @media screen and (max-width: 900px){
        display: none;
    }
    margin-right: -3.5px;
    margin-top: 7px;
    div {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 50%;
        overflow: hidden;
        width: 70px;
        height: 70px;
    }
`

const LogoIconMobile = styled.div`
  @media screen and (min-width: 900px){
      display: none;
  }
    margin-right: -7px;
    margin-top: 7px;
    div {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 50%;
        overflow: hidden;
        width: 70px;
        height: 70px;
    }
`