import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import Grid from '@mui/material/Unstable_Grid2';

 const HowTo = () => {
  return (
        <Box sx={{ margin: '2rem auto' }}>
        <Grid container spacing={2} sx={{justifyContent: "center"}}>
            <Grid xs={10}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>How this app works</Typography>
                </AccordionSummary>

                <AccordionDetails>
                <Timeline>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Upload CSV file</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Add your priceLists</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Match product from CSV to the pricelists ID</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>Use as you will!</TimelineContent>
                    </TimelineItem>
                </Timeline>
                </AccordionDetails>
            </Accordion>
            </Grid>

            <Grid xs={10}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Google Login/Register profits</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    As you login to your Google account, your pricelists are added to database, so you don't have to remade them every time you enter this app.
                </Typography>
                </AccordionDetails>
            </Accordion>
            </Grid>

            <Grid xs={10}>
                <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>CSV file rules</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    CSV have to be table with file fields: Name, SKU, weight (number), width (number), height (number), depth(number).
                    <br />
                    You can add example here:
                    <br />
                    <a href='../' download>Click to download</a>
                </Typography>
                </AccordionDetails>
            </Accordion>
            </Grid>
      </Grid>
    </Box>
  );
}

export default HowTo