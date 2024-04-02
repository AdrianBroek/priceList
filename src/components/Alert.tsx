import React, { useEffect,useState } from 'react'
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { useAppDispatch } from '../hooks';
import { clearAlert } from '../store/alertSlice';


const AlertComponent = ({text, type, id}: {
    text: string | undefined,
    type: string | undefined,
    id: any, 
}) => {
  const [checked, setChecked] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(()=> {
    const timer = setTimeout(()=> {
      setChecked(false);
    },5000);
    // cleanup effect with clearTimeout
    return () => clearTimeout(timer);
  },[]);

  const deleteAlert = () => {
    setChecked(false);
  }

    return (
      <Box
      sx={{
        height: 'auto',
        width: 300,
        // position: 'fixed',
        // top: '88%',
        // right: 15,
        zIndex: 10,
      }}
    >
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit onExited={()=>dispatch(clearAlert(id))} >
        
        <Paper onClick={deleteAlert} sx={{ m: 0.15, width: 300, height: 'auto', cursor: 'pointer' }} elevation={2}>
          {type === "info" && (
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              {text}
            </Alert>
          )}
          {type === "success" && (
            <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {text}
            </Alert>
          )}
          {type === "warning" && (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              {text}
            </Alert>
          )}
          {type === "error" && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {text}
            </Alert>
          )}
        </Paper>
      </Slide>
    </Box>
    )
}

export default AlertComponent


