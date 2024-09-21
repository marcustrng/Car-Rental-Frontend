import {setUserInfo} from "../../utils/local-storage";
import {baseApi} from "./baseApi"

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => {
                // Log the login data being sent
                return {
                    url: `/login`,
                    method: 'POST',
                    body: loginData, // Use 'body' instead of 'data' for fetch
                };
            },
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = (await queryFulfilled).data;
                    setUserInfo({accessToken: result.Authorization, username: arg.username});
                } catch (error) {
                }
            },
        }),
        signUp: build.mutation({
            query: (data) => {
                console.log('Sign-up data:', data);  // Log the input data
                return {
                    url: `/users/register`,
                    method: 'POST',
                    body: {
                        email: data.email,
                        password: data.password,
                        repeatPassword: data.password,
                        username: data.email.split('@')[0],
                        firstName: data.firstName,
                        lastName: data.lastName,
                    },
                };
            },
            transformResponse: (response) => {
                console.log('Sign-up response: ', response);  // Log the server's response
                return response;
            },
            onError: (error) => {
                console.error('Sign-up error:', error);  // Log any error that occurs
            },
        }),

    })
})

export const {
    useUserLoginMutation,
    useSignUpMutation,
} = authApi