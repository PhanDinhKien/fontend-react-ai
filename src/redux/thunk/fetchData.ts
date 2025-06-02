import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './api';

// URL cố định cho fetchDataThunk
const DATA_API_URL = 'https://api.example.com/data';

export const fetchDataThunk = createAsyncThunk(
  'api/fetchData',
  async (_: void, { rejectWithValue }) => {
    try {
      return await callApi({ url: DATA_API_URL, method: 'GET' });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// deleteDataThunk nhận id, url động dựa trên id
export const deleteDataThunk = createAsyncThunk(
  'api/deleteData',
  async (id: string, { rejectWithValue }) => {
    const url = `${DATA_API_URL}/${id}`;
    try {
      return await callApi({ url, method: 'DELETE' });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);