import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {increment, decrement} from './store/counterSlice'
import ProudctList from './components/productList';
import PriceList from './components/priceList';
import MatchArea from './components/MatchArea';
import EnhancedTable from './components/TableWithPriceList';
import CSVReader from './components/LoadProductsFromCsv';
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { PaletteMode, Switch } from '@mui/material';
import ModeSwitch from './components/modeSwitch'
import Login from './components/testAuth';
import { auth } from './firebase';
import GoogleAuth from './components/googleAuth';

function App() {
    const dispatch = useDispatch();
    const counter = useSelector((state:any) => state.counter.value);
    const user = auth.currentUser;
    const handleIncrement = () => {
      dispatch(increment());
    };

    useEffect(()=> {
      console.log(user)
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
        {/* <p>stan: {counter}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={()=>dispatch(decrement())}></button> */}
        <GoogleAuth />
        <ModeSwitch />
        <CSVReader />
        {/* <Login /> */}
        
        <ProudctList />
        <PriceList />
        <EnhancedTable />
        <MatchArea />
      </div>
      </ThemeProvider>
      
    );
}

export default App;
