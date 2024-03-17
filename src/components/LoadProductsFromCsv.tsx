import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Papa from 'papaparse'
import { fetchProductsSuccess, fetchProductFromUser, resetProducts } from '../store/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Product } from './types/Product';
import styled from "@emotion/styled";
// modal mui
import BasicModal from './ModalMui'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

const LoadProductsFromCsv = () => {
  const userData = useAppSelector((state) => state.userData)
  const [loadedItems, setLoadedItems] = useState<Product[]>([])
  const [prodList, setProdList] = useState<Product[]>([])
  const [prodList2, setProdList2] = useState<Product[] | any>([])
  const dispatch = useAppDispatch()
  const [fileName, setFileName] = useState<String>('')
  // modal state
  const [open, setOpen] = React.useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    if(event.target.files[0].type == 'text/csv'){
      // Passing file data (event.target.files[0]) to parse using Papa.parse
      Papa.parse(event.target.files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results:any) {
          setLoadedItems(results.data)
        },
      });
      setFileName(event.target.files[0].name)
      // console.log(event.target.files[0].type)
    
      // console.log(event.target.files[0])
    }else{
      return setOpen(true)
    }
  };

  

  const fileInputDragDrop = (e: React.DragEvent<HTMLInputElement> | any) => {
    // e.preventDefault();
    // console.log(e.target.files[0])
  }

  useEffect(() => {
    if (loadedItems.length > 0) {
      // console.log(loadedItems)
      const newArray: Product[] = []
      loadedItems.forEach((prod: Product, index: number) => {
        const newObj: Product = { ...prod };
        // change retrieved items from csv to numbers
        if (typeof prod.width === 'string' && prod.width !== '') {
          newObj.width = parseFloat(prod.width);
        } else {
          newObj.width = 0;
        }
        if (typeof prod.height === 'string' && prod.height !== '') {
          newObj.height = parseFloat(prod.height);
        } else {
          newObj.height = 0;
        }
        if (typeof prod.weight === 'string' && prod.weight !== '') {
          const pWeight:string = prod.weight
          const convertedWeight:string | number = parseFloat(pWeight.replace(/,/g, '.'))

          newObj.weight = convertedWeight;

        } else {
          newObj.weight = 0;
        }
        if (typeof prod.depth === 'string' && prod.depth !== '') {
          newObj.depth = parseFloat(prod.depth);
        } else {
          newObj.depth = 0;
        }
        
        newArray.push(newObj)

        if(index == loadedItems.length - 1) {
          // console.log(newArray)
          setProdList(newArray)

        }
        // Repeat similar checks for height, depth, and weight properties...
        
      });
      
    }
  }, [loadedItems]);

  useEffect(()=> {
    if(prodList.length > 0){
      // console.log(prodList)
      dispatch(fetchProductsSuccess(prodList))
    }
  },[prodList])


  // add products to firebase
  function addProductsToUser(){
    if(prodList.length > 0){
    const databaseURL = "https://tester-a7ca6-default-rtdb.europe-west1.firebasedatabase.app"
    const path = `/userId/${userData.id}/productList.json`; // Ścieżka do danych w bazie
      fetch(databaseURL+path, {
        method: "PUT",
        headers: {
          'Content-Type': 'Application'
        },
        body: JSON.stringify(prodList)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parsuj odpowiedź JSON
      })
      .then((data) => {
        // console.log('Zaktualizowane dane:', data);
      })
      .catch((error) => {
        console.error('Błąd aktualizacji danych:', error);
      });
    }
  }

  // add products to firebase
  useEffect(()=>{ 
    if(userData.logged && prodList.length > 0) {
      addProductsToUser()
      // console.log('dodano produkty nowe do fireb')
    }
  },[prodList])


    // receive data from firebase after logged user
    useEffect(()=> {
      if(userData.logged){
        dispatch(fetchProductFromUser(userData.id))
        setFileName('product list from database')
      }else if (!userData.logged) {
        // reset file after user logout
        dispatch(resetProducts())
        setFileName('')
      }
  }, [userData])

  const theme = useSelector((state: any) => state.theme)

  return (
    <section>
      <Form>
        <input 
        type="file" 
        onChange={changeHandler}
        // onDragEnter={e => fileInputDragEnter(e)}
        // onDragLeave={e => fileInputDragLeave(e)}
        // onDrop={e => fileInputDragDrop(e)} 
        />
        <FileInputStyled className={theme.mode =='light' ? 'light' : 'dark'}>
          {fileName ? 
            <div>
              <InsertDriveFileOutlinedIcon />
              <h6>{fileName}</h6>
            </div>
          :
            // <p>Upload CSV file</p>
            <IconButton  aria-label="upload">
              <Typography
                sx={{fontSize: '.8rem', fontWeight: 500}}
                noWrap
              >
                Upload CSV file
              </Typography>
              <DriveFolderUploadIcon sx={{marginLeft: '.5rem'}}/>
            </IconButton>
          }
        </FileInputStyled>
        <BasicModal open={open} setOpen={setOpen}/>
      </Form>
    </section>
  );
}

export default LoadProductsFromCsv

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;  
  position: relative;
  height: 50px;
  margin-top: 2rem;
  input {
    width: 50%;
    height: 100%;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
  }
  
`

const FileInputStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
  z-index: 1;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
  border-radius: 4px;
  background-color: #121212;
  padding: 1rem 0;
  &.light {
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    background-color: #FFFFFF;
  }
  p {
    margin: 0 auto;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center; 
  }
`
