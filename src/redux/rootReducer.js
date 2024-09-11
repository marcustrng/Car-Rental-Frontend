import { baseApi } from "./api/baseApi";
import invoiceSlice from "./feature/invoiceSlice";
import carReducer from "./feature/carSlice";

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    invoice: invoiceSlice,
    // car: carReducer,
}