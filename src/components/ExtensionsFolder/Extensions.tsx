import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOpenExtension } from '../../store/extensionsReducer';
import CollapsibleTable from './ExctensionsTable';
import ComboBox from './ExtensionsInput';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Extensions = () => {
    const dispatch = useAppDispatch();
    const {openExtensions} = useAppSelector(state => state.extension);
    const userData = useAppSelector(state=>state.userData);
    const {extensionList} = useAppSelector(state=>state.extension);
    const handleClose = () => dispatch(setOpenExtension(false));

    useEffect(()=> {
        insertExtensionListToDB()
    },[extensionList])

    function insertExtensionListToDB() {
        if(userData){
          const databaseURL = 'https://tester-a7ca6-default-rtdb.europe-west1.firebasedatabase.app';
          const path = `/userId/${userData.id}/exceptionList.json`; 

          fetch(databaseURL + path, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(extensionList)
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            // console.log('Zaktualizowane dane:', data);
          })
          .catch((error) => {
            console.error('Data update error:', error);
          });
        }
    }

    return (
        <div>
          <Modal
            open={openExtensions}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add exceptions
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Assign price lists to products manually.
              </Typography>
              <ComboBox />
              <CollapsibleTable />
            </Box>
          </Modal>
        </div>
      );
}

export default Extensions