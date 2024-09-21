import {tagTypes} from "../tag-types"
import {baseApi} from "./baseApi"

const USER_URL = '/users'

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserByUsername: build.mutation({
            query: (username) => {
                console.log(`Fetching user by username: ${username}`);  // Log the username being queried
                return {
                    url: `${USER_URL}/${username}`,
                    method: 'GET'
                };
            },
            providesTags: [tagTypes.users]
        }),

    })
})

export const {useGetUserByUsernameMutation} = userApi