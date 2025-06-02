import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApi } from '../thunk/api';

interface FetchDataState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: FetchDataState & { form: any } = {
  data: null,
  loading: true,
  error: null,
  form: null, // Sẽ lưu instance của form (thường là const [form] = useForm())
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

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const fetchDataThunk = createAsyncThunk('fetchData/fetchDataThunk', async () => {
  const response = await callApi({ url: `${API_BASE_URL}/data`, method: 'GET' });
  return response;
});

export const deleteDataThunk = createAsyncThunk('fetchData/deleteDataThunk', async (id: number) => {
  const response = await callApi({ url: `${API_BASE_URL}/data/${id}`, method: 'DELETE' });
  return response;
});

const fetchDataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {
    setForm(state, action) {
      debugger; 
      state.form = action.payload;
    },
  },
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

export const { setForm } = fetchDataSlice.actions;

export default fetchDataSlice.reducer;
