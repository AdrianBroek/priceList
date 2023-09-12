// reducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchPriceList } from '../actions/fetchPriceListData';

interface handler {
  data: any,
  loading: boolean,
  error: any,
}

const initialState:handler = {
  data: null,
  loading: false,
  error: null,
};

const importPriceListReducer = createSlice({
  name: 'priceListToUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriceList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPriceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default importPriceListReducer.reducer;
