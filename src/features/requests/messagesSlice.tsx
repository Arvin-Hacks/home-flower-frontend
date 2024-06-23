import { toast } from "@/components/ui/use-toast";
import axios from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    addMessageData: any
    getAllRequestMessageData: any
    // getProductsRequestDetailsData: any
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    addMessageData: [],
    getAllRequestMessageData: [],
    error: null,
    loading: false
}

interface GetAllProductsRequestAPIAgrs {
    page?: number
    limit?: number
    search?: string
    // filter?: any
}

export interface MessagesType {
    _id?: string
    message: string
    type: "Admin" | "User"
    requestId: string
    userId: string
    createdAt?: Date | string | any

}



export const AddRequestMessageApi = createAsyncThunk(
    'message/add',
    async (data: MessagesType) => {
        try {
            const response = await axios.post('/api/v1/messages/', data)
            toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('Add request Messages error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getAllRequestMessageApi = createAsyncThunk<any, GetAllProductsRequestAPIAgrs>(
    'message/get',
    async ({ page, limit, search, }) => {
        try {
            const response = await axios.get(`/api/v1/requests/?page=${page}&${limit && "limit=" + limit}${search && "&search=" + search}`)
            // toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product Request fetch error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getProductsRequestDetailsApi = createAsyncThunk(
    'message/getdetails',
    async (id: string) => {
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



const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddRequestMessageApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddRequestMessageApi.fulfilled, (state, action) => {
                state.loading = false;
                state.addMessageData = action.payload;
                // state.signupUser = jwtDecode(action.payload.token);  // Correct usage
                // localStorage.setItem('token', action.payload.token);
            })
            .addCase(AddRequestMessageApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request failed';
            });
        builder
            .addCase(getProductsRequestDetailsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsRequestDetailsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllRequestMessageData = action.payload;
            })
            .addCase(getProductsRequestDetailsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request fetch failed';
            });        
    }
})

export default messageSlice.reducer