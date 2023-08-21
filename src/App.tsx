import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {increment, decrement} from './store/counterSlice'
import ProudctList from './components/productList';
import PriceList from './components/priceList';
import MatchArea from './components/MatchArea';
import EnhancedTable from './components/TableWithPriceList';
import CSVReader from './components/LoadProductsFromCsv';

function App() {
    const dispatch = useDispatch();
    const counter = useSelector((state:any) => state.counter.value);
   
    const handleIncrement = () => {
      dispatch(increment());
    };

    useEffect(()=> {
      // console.log(counter.value)
    }, [counter])

    return (
      <div className="App">
        {/* <p>stan: {counter}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={()=>dispatch(decrement())}></button> */}
        <CSVReader />
        <ProudctList />
        <PriceList />
        <EnhancedTable />
        <MatchArea />
      </div>
    );
}

export default App;
