import { toast } from "@/components/ui/use-toast";
import axios from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    addProductRequestData: any
    getAllProductsRequestData: any
    getProductsRequestDetailsData: any
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    addProductRequestData: [],
    getAllProductsRequestData: [],
    getProductsRequestDetailsData: [],
    error: null,
    loading: false
}

interface GetAllProductsRequestAPIAgrs {
    page?: number
    limit?: number
    search?: string
    // filter?: any
}

export const AddProductRequestApi = createAsyncThunk(
    'request/add',
    async (data: FormData) => {
        try {
            const response = await axios.post('/api/v1/requests/create-request', data)
            toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product request error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getAllProductsRequestApi = createAsyncThunk<any,GetAllProductsRequestAPIAgrs>(
    'request/get',
    async ({ page,limit,search,}) => {
        try {
            const response = await axios.get(`/api/v1/requests/?page=${page}&${limit&& "limit="+limit}${search&& "&search="+search}`)
            // toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product Request fetch error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getProductsRequestDetailsApi = createAsyncThunk(
    'request/getdetails',
    async (id:string) => {
        try {
            const response = await axios.get(`/api/v1/requests/request-details/${id}`)
            // toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product Request details fetch error', error)
            toast({ title: error?.message })
            return false
        }

    })



const productSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddProductRequestApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddProductRequestApi.fulfilled, (state, action) => {
                state.loading = false;
                state.addProductRequestData = action.payload;
                // state.signupUser = jwtDecode(action.payload.token);  // Correct usage
                // localStorage.setItem('token', action.payload.token);
            })
            .addCase(AddProductRequestApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request failed';
            });
        builder
            .addCase(getAllProductsRequestApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProductsRequestApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllProductsRequestData = action.payload;
            })
            .addCase(getAllProductsRequestApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request fetch failed';
            });
        builder
            .addCase(getProductsRequestDetailsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsRequestDetailsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getProductsRequestDetailsData = action.payload;
            })
            .addCase(getProductsRequestDetailsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request details fetch failed';
            });
    }
})

export default productSlice.reducer