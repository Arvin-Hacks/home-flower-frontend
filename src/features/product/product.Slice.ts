import { toast } from "@/components/ui/use-toast";
// import { IProduct } from "@/type";
import axios from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    addProductData: any
    getAllProductsData: any
    getProductsDetailsData: any
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    addProductData: [],
    getAllProductsData: [],
    getProductsDetailsData: [],
    error: null,
    loading: false
}

interface GetAllProductsAPIAgrs {
    page?: number
    limit?: number
    search?: string
    category?: string
    filter?: any
}

export const AddProductApi = createAsyncThunk(
    'product/add',
    async (data: FormData) => {
        try {
            const response = await axios.post('/api/v1/product/add-product', data)
            toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getAllProductsApi = createAsyncThunk<any,GetAllProductsAPIAgrs>(
    'product/get',
    async ({ page,limit,search,category}) => {
        try {
            const response = await axios.get(`/api/v1/product/?page=${page}&${limit&& "limit="+limit}${search&& "&search="+search}${category&& "&category="+category}`)
            // toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product get error', error)
            toast({ title: error?.message })
            return false
        }

    })
export const getAProductDetailsApi = createAsyncThunk(
    'product/getdetails',
    async (id:string) => {
        try {
            const response = await axios.get(`/api/v1/product/product-details/${id}`)
            // toast({ title: response?.data?.message })
            return response.data

        } catch (error: any) {
            console.log('product details get error', error)
            toast({ title: error?.message })
            return false
        }

    })



const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddProductApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddProductApi.fulfilled, (state, action) => {
                state.loading = false;
                state.addProductData = action.payload;
                // state.signupUser = jwtDecode(action.payload.token);  // Correct usage
                // localStorage.setItem('token', action.payload.token);
            })
            .addCase(AddProductApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product insert failed';
            });
        builder
            .addCase(getAllProductsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProductsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllProductsData = action.payload;
            })
            .addCase(getAllProductsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product fetch failed';
            });
        builder
            .addCase(getAProductDetailsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAProductDetailsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.getProductsDetailsData = action.payload;
            })
            .addCase(getAProductDetailsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Product details fetch failed';
            });
    }
})

export default productSlice.reducer