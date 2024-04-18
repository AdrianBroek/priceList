import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { auth } from './firebase';
import ResponsiveAppBar from './layout/appBar';
import { Routes , Route, useLocation } from "react-router-dom";
import HomePage from './layout/HomePage';
import HowTo from './layout/HowTo';
import ProductListPage from './layout/ProductListPage';
import AlertContainer from './layout/AlerContainer';
import ContactForm from './layout/ContactPage';
import GlobalStyles from "@mui/material/GlobalStyles";
import { useAppSelector } from './hooks';

function App() {
    const user = auth.currentUser;
    const location = useLocation();
    const themeCOLOR = useAppSelector((state)=>state.theme)
    
    const getDesignTokens = (mode: PaletteMode) => ({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              // palette values for light mode
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
              background: {
                default: '#f5f5f5',
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
        <GlobalStyles
        styles={{
          body: { backgroundColor: themeCOLOR.mode === "light" ? "#f5f5f5" : "#000" }
        }}
      />
      <div className="App">
        <ResponsiveAppBar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/product-list" element={<ProductListPage />} ></Route>
          <Route path='/how-to' element={<HowTo />}></Route>
          <Route path='/contact' element={<ContactForm />}></Route>
        </Routes>
        <AlertContainer />
      </div>
      </ThemeProvider>
    );
}

export default App;
