import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Common API call helper with method support
export async function callApi({ url, token, language, method = 'GET', body, options = {} }: {
  url: string;
  token?: string;
  language?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  options?: RequestInit;
}) {
  let headers: Record<string, string> = {};
  if (options.headers) {
    headers = { ...options.headers } as Record<string, string>;
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (language) headers['Accept-Language'] = language;
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    headers['Content-Type'] = 'application/json';
  }
  const fetchOptions: RequestInit = {
    method,
    ...options,
    headers,
  };
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const response = await fetch(url, fetchOptions);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

// Example async thunk for fetching data from an API
export const fetchData = createAsyncThunk(
  'api/fetchData',
  async ({ url, token, language, method, body }: {
    url: string;
    token?: string;
    language?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
  }) => {
    return await callApi({ url, token, language, method, body });
  }
);

interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default apiSlice.reducer;
