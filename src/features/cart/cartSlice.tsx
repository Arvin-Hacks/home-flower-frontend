import { toast } from "@/components/ui/use-toast";
import axios from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    addToCartData: any
    removeFromCartData: any
    getCartData: any
    // getProductsRequestDetailsData: any
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    addToCartData: [],
    removeFromCartData: [],
    getCartData: [],
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

export interface CartBody {
    _id?: string
    productId: string
    quantity?: number
    userId: string
    createdAt?: Date | string | any

}
export interface RemoveCartBody {
    _id?: string
    productId: string
    quantity?: number
    userId: string
    createdAt?: Date | string | any

}



export const addToCartApi = createAsyncThunk(
    'cart/add',
    async (data: CartBody) => {
        try {
            const response = await axios.post('/api/v1/cart/add', data)
            toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('Add to cart error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const removeFromCartApi = createAsyncThunk(
    'cart/remove',
    async (data: RemoveCartBody) => {
        try {
            const response = await axios.post('/api/v1/cart/remove', data)
            toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('Remove cart  error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getUserCartApi = createAsyncThunk<any, GetAllProductsRequestAPIAgrs>(
    'cart/get',
    async ({ userId, page, limit, search, }) => {
        try {
            const response = await axios.get(`/api/v1/cart/?userId=${userId}&page=${page}&${limit && "limit=" + limit}${search && "&search=" + search}`, )
            // toast({ title: response?.data?.message })
            console.log('carts data',response)
            return response.data

        } catch (error: any) {
            console.log('cart product fetch error', error)
            toast({ title: error?.message })
            return false
        }

    })




const messageSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartApi.fulfilled, (state, action) => {
                state.loading = false;
                state.addToCartData = action.payload;
                // state.signupUser = jwtDecode(action.payload.token);  // Correct usage
                // localStorage.setItem('token', action.payload.token);
            })
            .addCase(addToCartApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request failed';
            });
        builder
            .addCase(removeFromCartApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCartApi.fulfilled, (state, action) => {
                state.loading = false;
                state.removeFromCartData = action.payload;
            })
            .addCase(removeFromCartApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request fetch failed';
            });
        builder
            .addCase(getUserCartApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserCartApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getCartData = action.payload;
            })
            .addCase(getUserCartApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product Request fetch failed';
            });
    }
})

export default messageSlice.reducer