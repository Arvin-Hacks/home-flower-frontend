import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import jwtDecode from 'jwt-decode';
// import { error } from 'console';
import { toast } from '@/components/ui/use-toast';


interface AuthState {
  token: string | null;
  user: any;
  signupUser: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  signupUser: null
};

export type SignupData={
  email: string
  password: string
}

export const loginApi = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // const response = await axios.post('/api/v1/users/login', credentials);
    // return response.data;

    try {

      const response = await axios.post('/api/v1/users/login', credentials);
      console.log('object',response);

      if (response.status < 300) {
        toast({title:response?.data?.message})
        return response.data;

      }
      console.log('object',response);
      throw new Error(response.data?.message)

    } catch (error:any) {
      console.log('sign up error:-', error)
      console.log('error?.response?.message',error?.response?.data?.message);
      toast({title:error?.response?.data?.message ?? error?.message, variant:'destructive'})
      return false

    }
  
  }
);

export const signupApi = createAsyncThunk<any ,SignupData>(
  'auth/signup',
  async ({email,password}) => {
    const credentials= { email, password }
    console.log('credentials',credentials)
    try {

      const response = await axios.post('/api/v1/users/register', credentials);
      console.log('object',response);

      if (response.status < 300) {
        toast({title:response?.data?.message})
        return response.data;

      }
      console.log('object',response);
      throw new Error(response.data?.message)

    } catch (error:any) {
      console.log('sign up error:-', error)
      console.log('error?.response?.message',error?.response?.data?.message);
      toast({title:error?.response?.data?.message ?? error?.message, variant:'destructive'})
      return false

    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // state.user = jwtDecode(action.payload);  // Correct usage
      localStorage.setItem('token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // state.user = jwtDecode(action.payload.token);  // Correct usage
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
    builder
      .addCase(signupApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupApi.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // state.signupUser = jwtDecode(action.payload.token);  // Correct usage
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signupApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout, setToken, } = authSlice.actions;

export default authSlice.reducer;
