import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi"

const CAR_URL = '/cars'

export const carsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query({
            query: ({page = 0, size = 5, query = ''} = {}) => ({
                url: `${CAR_URL}/all`,
                method: 'GET',
                params: {
                    page,
                    size,
                    query
                }
            }),
            transformResponse: (response) => {
                return {
                    cars: response.content,
                    meta: {
                        totalElements: response.totalElements,
                        totalPages: response.totalPages,
                        currentPage: response.number,
                        pageSize: response.size
                    }
                };
            },
            providesTags: [tagTypes.cars]
        }),
        getAvailableCars: builder.query({
            query: ({startDate, endDate, username, page = 0, size = 5, query = ''}) => {
                const requestBody = {
                    startDate,
                    endDate,
                    username,
                };

                const params = {
                    page,
                    size,
                    query,
                };
                return {
                    url: `${CAR_URL}/available`,
                    method: 'POST',
                    body: requestBody,
                    params,
                };
            },
            transformResponse: (response) => {
                return {
                    cars: response.content,
                    meta: {
                        totalElements: response.totalElements,
                        totalPages: response.totalPages,
                        currentPage: response.number,
                        pageSize: response.size,
                    },
                };
            },
            invalidatesTags: [tagTypes.cars],
        }),
        getCarById: builder.query({
            query: (id) => ({
                url: `${CAR_URL}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response; // Return the CarViewModel directly
            },
            providesTags: (result, error, id) => [{type: tagTypes.cars, id}],
        }),
        getCheckCarAvailableById: builder.query({
            query: ({carId, selectedFromDate, selectedToDate, username}) => {
                const requestBody = {
                    startDate: selectedFromDate,
                    endDate: selectedToDate,
                    username: username,
                };
                return {
                    url: `${CAR_URL}/check/${carId}`,
                    method: 'POST',
                    body: requestBody,
                };
            },
            transformResponse: (response) => {
                return response; // Return the CarViewModel directly
            },
            providesTags: (result, error, id) => [{type: tagTypes.cars, id}],
        }),
        createReserve: builder.mutation({
            query: ({carId, data}) => {
                return {
                    url: `${CAR_URL}/reserve/${carId}`,
                    method: 'POST',
                    body: data
                };
            },
            async onQueryStarted(arg, {queryFulfilled}) {
                try {
                    const response = await queryFulfilled;
                    // Log the successful response
                } catch (error) {
                    // Log any error that occurs
                }
            },
            invalidatesTags: [tagTypes.cars],
        }),
    }),
});

export const {
    useGetCarsQuery,
    useGetAvailableCarsQuery,
    useGetCarByIdQuery,
    useGetCheckCarAvailableByIdQuery,
    useCreateReserveMutation,
} = carsApi;