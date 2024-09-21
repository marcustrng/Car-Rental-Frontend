import {baseApi} from "./baseApi"

const RENT_URL = '/rents'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRentById: build.query({
            query: (id) => ({
                url: `${RENT_URL}/${id}`,
                method: 'GET'
            })
        }),
        getAllRentByUser: build.query({
            query: (username) => ({
                url: `/sales/all/${username}?page=0&query=`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                // Log the full response
                return {
                    rents: response.content,
                    meta: {
                        totalElements: response.totalElements,
                        totalPages: response.totalPages,
                        currentPage: response.number,
                        pageSize: response.size,
                    },
                };
            },
        }),
    })
})

export const {
    useGetRentByIdQuery,
    useGetAllRentByUserQuery,
} = appointmentApi;