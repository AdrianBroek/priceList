import React, { useEffect,useState } from 'react'
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';


const AlertComponent = ({text, type}: {
    text: string,
    type: string | undefined
}) => {
    const [checked, setChecked] = useState(true);
    console.log(text)
    console.log(type)
    const containerRef = React.useRef<HTMLElement>(null);

    // const [checked, setChecked] = React.useState(false);

    useEffect(()=> {
      setTimeout(()=> {
        // setChecked(false)
      },5000)
    },[])

    return (
      <Box
      sx={{
        height: 77,
        width: 300,
        // position: 'fixed',
        // top: '88%',
        // right: 15,
        // zIndex: 120,
      }}
    >
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        <Paper onClick={()=>setChecked(false)} sx={{ m: 1, width: 300, height: 76, cursor: 'pointer' }} elevation={3}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {text}
          </Alert>
        </Paper>
        {/* <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>

        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning Alert with a cautious title.
        </Alert>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error Alert with a scary title.
        </Alert> */}
      </Slide>
    </Box>
    )
}

export default AlertComponent


