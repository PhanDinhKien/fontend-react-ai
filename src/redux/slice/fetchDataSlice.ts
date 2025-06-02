import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApi } from '../thunk/api';

interface FetchDataState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: FetchDataState = {
  data: null,
  loading: true,
  error: null,
};

const handleFetchDataPending = (state: FetchDataState) => {
  state.loading = true;
  state.error = null;
};
const handleFetchDataFulfilled = (state: FetchDataState, action: any) => {
  state.loading = false;
  state.data = action.payload;
};
const handleFetchDataRejected = (state: FetchDataState, action: any) => {
  state.loading = false;
  state.error = action.error.message || 'Error';
};

const handleDeleteDataPending = (state: FetchDataState) => {
  state.loading = true;
  state.error = null;
};
const handleDeleteDataFulfilled = (state: FetchDataState, action: any) => {
  state.loading = false;
  state.data = action.payload;
};
const handleDeleteDataRejected = (state: FetchDataState, action: any) => {
  state.loading = false;
  state.error = action.error.message || 'Error';
};

export const fetchDataThunk = createAsyncThunk('fetchData/fetchDataThunk', async () => {
  const response = await callApi({ url: 'https://api.example.com/data', method: 'GET' });
  return response;
});

export const deleteDataThunk = createAsyncThunk('fetchData/deleteDataThunk', async (id: number) => {
  const response = await callApi({ url: `https://api.example.com/data/${id}`, method: 'DELETE' });
  return response;
});

const fetchDataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.pending, handleFetchDataPending)
      .addCase(fetchDataThunk.fulfilled, handleFetchDataFulfilled)
      .addCase(fetchDataThunk.rejected, handleFetchDataRejected)
      .addCase(deleteDataThunk.pending, handleDeleteDataPending)
      .addCase(deleteDataThunk.fulfilled, handleDeleteDataFulfilled)
      .addCase(deleteDataThunk.rejected, handleDeleteDataRejected);
  },
});

export default fetchDataSlice.reducer;
