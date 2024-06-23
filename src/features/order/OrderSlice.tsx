import { toast } from "@/components/ui/use-toast";
import { IProduct } from "@/type";
import axios from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    placeOrderData: any
    getorderDetailsData: any
    getOrdersData: any
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    placeOrderData: [],
    getOrdersData: [],
    getorderDetailsData: [],
    error: null,
    loading: false
}

interface GetAllProductsRequestAPIAgrs {
    page?: number
    limit?: number
    search?: string
    userId: string
    // filter?: any
}

interface OrderItem {
    product: IProduct
    quantity: number
}



export interface OrderData {
    _id?: string
    items: OrderItem[]
    user: string
    createdAt?: Date | string | any

}




export const placeOrderApi = createAsyncThunk(
    'order/add',
    async (data: OrderData) => {
        try {
            const response = await axios.post('/api/v1/order/', data)
            toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('Place Order error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getUserOrdesApi = createAsyncThunk<any, GetAllProductsRequestAPIAgrs>(
    'order/get',
    async ({ userId, page, limit, search, }) => {
        try {
            const response = await axios.get(`/api/v1/order/?userId=${userId}&page=${page}&${limit && "limit=" + limit}${search && "&search=" + search}`,)
            // toast({ title: response?.data?.message })
            console.log('orders data', response)
            return response.data

        } catch (error: any) {
            console.log('orders fetch error', error)
            toast({ title: error?.message })
            return false
        }

    })




const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeOrderApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.placeOrderData = action.payload;
                // state.signupUser = jwtDecode(action.payload.token);  // Correct usage
                // localStorage.setItem('token', action.payload.token);
            })
            .addCase(placeOrderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Order Place Request failed';
            });      
        builder
            .addCase(getUserOrdesApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrdesApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getOrdersData = action.payload;
            })
            .addCase(getUserOrdesApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Order Request fetch failed';
            });
    }
})

export default OrderSlice.reducer