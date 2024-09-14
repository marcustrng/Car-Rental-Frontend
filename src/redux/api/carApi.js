import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi"

const CAR_URL = '/cars'

export const carsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCars: build.query({
            query: ({ page = 0, size = 5, query = '' } = {}) => ({
                url: `${CAR_URL}/all`,
                method: 'GET',
                params: {
                    page,
                    size,
                    query
                }
            }),
            transformResponse: (response) => {
                console.log("Full response:", response);

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
    }),
});

export const {
    useGetCarsQuery,
} = carsApi;