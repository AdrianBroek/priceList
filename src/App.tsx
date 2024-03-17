import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {increment, decrement} from './store/counterSlice'
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteMode, Switch } from '@mui/material';
import { auth } from './firebase';
import ResponsiveAppBar from './layout/appBar';
import { Routes , Route, useLocation } from "react-router-dom";
import HomePage from './layout/HomePage';
import HowTo from './layout/HowTo';

function App() {
    const dispatch = useDispatch();
    const counter = useSelector((state:any) => state.counter.value);
    const user = auth.currentUser;
    const location = useLocation()
    const handleIncrement = () => {
      dispatch(increment());
    };

    useEffect(()=> {
      // console.log(user)
    }, [user])
    
    const getDesignTokens = (mode: PaletteMode) => ({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              // palette values for light mode
              // primary: amber,
              // divider: amber[200],
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
              background: {
                default: grey[200],
              },
            }
          : {
              // palette values for dark mode
              background: {
                default: '#000000',
              },
            }),
      },
    });
    
    const {mode} = useSelector((state: any) => state.theme)

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
      <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveAppBar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path='/how-to' element={<HowTo />}></Route>
        </Routes>
      </div>
      </ThemeProvider>
    );
}

export default App;
