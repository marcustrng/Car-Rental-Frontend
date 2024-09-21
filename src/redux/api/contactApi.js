import { baseApi } from "./baseApi"

export const contactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        contact: build.mutation({
            query: (data) => ({
                url: `/contract`,
                method: 'POST',
                body: data,
            })
        }),

    })
})

export const { useContactMutation } = contactApi;