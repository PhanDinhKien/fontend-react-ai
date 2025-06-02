import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApi } from './api';

// URL cố định cho fetchDataThunk
const DATA_API_URL = 'https://api.example.com/data';

export const fetchDataThunk = createAsyncThunk(
  'api/fetchData',
  async (_: void, { rejectWithValue }) => {
    try {
      return await callApi({ url: DATA_API_URL });
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

// Handlers for fetchDataThunk
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

// Handlers for deleteDataThunk
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
