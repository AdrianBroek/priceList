// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

// Tworzenie akcji asynchronicznej za pomocą createAsyncThunk
export const fetchPriceList = createAsyncThunk('priceListToUser/fetchPriceList', async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);
