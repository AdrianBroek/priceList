import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'
import { fetchProductsSuccess } from '../store/productSlice';
import { useDispatch } from 'react-redux';
import { Product } from './types/Product';

const LoadProductsFromCsv = () => {
  const [loadedItems, setLoadedItems] = useState<Product[]>([])
  const [prodList, setProdList] = useState<Product[]>([])
  const dispatch = useDispatch()

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      download: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (results:any) {
        // console.log(results.data)
        setLoadedItems(results.data)
        // dispatch(fetchProductsSuccess(results.data))
      },
    });

  };

  useEffect(() => {
    if (loadedItems.length > 0) {
      const newArray: Product[] = []
      loadedItems.forEach((prod: Product, index: number) => {
        const newObj: Product = { ...prod };
        
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
          newObj.weight = parseFloat(prod.weight);
        } else {
          newObj.weight = 0;
        }
        if (typeof prod.depth === 'string' && prod.depth !== '') {
          newObj.depth = parseFloat(prod.depth);
        } else {
          newObj.depth = 0;
        }
        // console.log(newObj)
        newArray.push(newObj)

        // console.log(loadedItems.length)
        // index == loadedItems.length - 1 ? console.log('yes') : console.log('no')
        if(index == loadedItems.length - 1) {
          // console.log(newArray)
          setProdList(newArray)

        }
        // Repeat similar checks for height, depth, and weight properties...
        
      });
      
      // setLoadedItems(updatedItems); // Update the loadedItems array
      
    }
  }, [loadedItems]);

  useEffect(()=> {
    if(prodList.length > 0){
      dispatch(fetchProductsSuccess(prodList))
    }
  },[prodList])

  return (
    <section>
      <form>
        <input type="file" onChange={changeHandler} />
      </form>
    </section>
  );
}

export default LoadProductsFromCsv